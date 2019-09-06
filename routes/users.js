const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Hospital = require('../models/hospital');
const Nexmo = require('nexmo');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const Menu = require('../models/menu');
const bcrypt = require('bcryptjs');
var requestId;
// Init Nexmo
const nexmo = new Nexmo({
  apiKey: '17774bc1',
  apiSecret: 'wJpbXEK6eVOQgH5k'
}, { debug: true });

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const firstName = req.body.firstName;
  const password = req.body.password;
  User.getUserByUsername(firstName, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, msg: 'User not found' });
    }
    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {

        const token = jwt.sign({ data: user }, config.secret, {
          expiresIn: 604800 // 1 week
        });
        res.json({
          success: true,
          token: `Bearer ${token}`,
          user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            dob: user.dob,
            email: user.email,
            phone: user.phone,
            address: user.address,
            userrole: user.userrole,
            userEmpId: user.userEmpId
          },
          expiresin: 604800
        });
      } else {
        return res.json({ success: false, msg: 'Wrong password' });
      }
    });
  });
});

router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ user: req.user });
})


let file;
var storage;
var upload;

router.post('/sendotp', (req, res) => {
  const number = req.body.phone;
  nexmo.verify.request({
    number: number,
    brand: 'Nexmo',
    code_length: '4'
  }, (err, result) => {
    console.log(err ? err : requestId = result.request_id)
  });

  res.json({ message: 'ok' });
});

// Register
router.post('/register', (req, res) => {
  nexmo.verify.check({
    request_id: requestId,
    code: req.body.otp
  }, (err, result) => {
    if (result['status'] == 0) {
      let newUser = new User({
        firstName: req.body.user.firstName,
        lastName: req.body.user.lastName,
        dob: req.body.user.dob,
        gender: req.body.user.gender,
        phone: req.body.user.phone,
        email: req.body.user.email,
        address: req.body.user.address,
        password: req.body.user.password,
        userrole: req.body.user.userrole,
        isAssigned: req.body.user.isAssigned,
        assignedTo: req.body.user.assignedTo
      });

      User.addUser(newUser, (err, user) => {
        if (err) {
          res.json({ success: false, msg: 'Failed to register user' });
        } else {
          const token = jwt.sign({ data: user }, config.secret, {
            expiresIn: 604800 // 1 week
          });
          res.json({
            success: true,
            msg: 'user registered',
            token: `Bearer ${token}`,
            user: {
              id: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              dob: user.dob,
              email: user.email,
              phone: user.phone,
              address: user.address,
              userrole: user.userrole
            },
            expiresin: 604800
          });
        }
      });
    }
  });
});

router.post('/addEmp', (req, res) => {

  let employee = new User({
    firstName: req.body.emp.firstName,
    lastName: req.body.emp.lastName,
    dob: req.body.emp.dob,
    gender: req.body.emp.gender,
    phone: req.body.emp.phone,
    email: req.body.emp.email,
    address: req.body.emp.address,
    password: req.body.emp.password,
    address: req.body.emp.address,
    userrole: req.body.emp.userrole,
    pan: req.body.emp.pan,
    passport: req.body.emp.passport,
    qualification: req.body.emp.qualification,
    maritalStatus: req.body.emp.maritalStatus,
    isAssigned: true
  });


  User.addUser(employee, (err, emp) => {
    if (err) {
      res.json({ success: false, msg: 'Failed to add employee' });
    }
    else {
      res.json({ success: true, msg: 'Successfully added employee' });
    }
  })
})

router.get('/getEmp/:role', (req, res) => {
  User.getUsersByRole(req.params.role, (err, users) => {
    if (err) throw err;
    else {
      res.json(users);
    }
  })
})

router.get('/deleteEmp/:empid', (req, res) => {
  User.deleteUser(req.params.empid, (err, success) => {
    if (err) throw err;
    else {
      res.json({ success: true, msg: 'Deleted user' });
    }
  })
})

router.post('/editEmp/:empId', (req, res) => {

  User.findById(req.params.empId, (err, user) => {
    if (!user) {
      res.json({ success: false, msg: 'Unable to load doc' });
    }
    else {
      user.firstName = req.body.emp.firstName;
      user.lastName = req.body.emp.lastName;
      user.dob = req.body.emp.dob;
      user.gender = req.body.emp.gender;
      user.phone = req.body.emp.phone;
      user.email = req.body.emp.email;
      user.address = req.body.emp.address;
      user.password = req.body.emp.password;
      user.address = req.body.emp.address;
      user.userrole = req.body.emp.userrole;
      user.pan = req.body.emp.pan;
      user.passport = req.body.emp.passport;
      user.qualification = req.body.emp.qualification;
      user.maritalStatus = req.body.emp.maritalStatus;
      user.save().then((user) => {
        res.json({ success: true, msg: 'Updated' });
      },
        err => {
          res.json({ success: false, msg: 'Update failed' });
        }
      );
    }
  })
})






router.post('/editUser', (req, res) => {
  var userId = req.body.user.id;
  nexmo.verify.check({
    request_id: requestId,
    code: req.body.otp
  }, (err, result) => {
    if (err) throw err;
    if (result['status'] == 0) {
      const query = {_id:userId};
   
      User.findOne({ _id: userId }).then(user => {
        if (user) {
          User.update({ _id: userId }, { $set: {
            firstName : req.body.user.firstName,
                 lastName : req.body.user.lastName,
                   dob : req.body.user.dob,
                  gender : req.body.user.gender,
                  phone : req.body.user.phone,
                   email : req.body.user.email,
                   address : req.body.user.address
             } }, (err, ass) => {
            (err) => { res.json({ success: false, msg: 'fail' }); },
              (ass) => { res.json({ success: true, msg: 'success' }); }
          })
        } else {
          console.log('err');
        }
      })
    }
  });
})





















router.get('/getNumOfUsersToAssign', (req, res) => {
  User.getNumOfUsersToAssign((err, count) => {
    if (err) throw err
    else {
      res.json(count)
    }
  })
})

router.get('/getUsers', (req, res) => {
  User.getUsers((err, users) => {
    if (err) throw err
    else {
      res.json(users)
    }
  })
})

router.get('/getUnassignedUsers', (req, res) => {
  User.getUnassignedUsers((err, users) => {
    if (err) throw err
    else {
      res.json(users)
    }
  })
})

router.get('/menus/:role', (req, res) => {
  Menu.getMenuByRole(req.params.role, (err, menu) => {
    if (err) throw err;
    else {
      res.json(menu);
    }
  })
})

router.post('/assign', (req, res) => {
  userList = req.body.userList;
  var empId = req.body.emp;
  userList.forEach(function (userName) {
    User.findOne({ _id: empId }).then(emp => {
      if (emp) {
        User.updateOne({ firstName: userName }, { $set: { assignedTo: emp.firstName, isAssigned: true, userEmpId: empId } }, (err, ass) => {
          (err) => { res.json({ success: false, msg: 'fail' }); },
            (ass) => { res.json({ success: true, msg: 'success' }); }
        })
      } else {
        console.log('err');
      }
    })
  })
})


router.get('/getEmpUsers/:empId', (req, res) => {

  User.getEmpUsers(req.params.empId, (err, users) => {
    if (err) throw err
    else {
      res.json(users)
    }
  })

})

router.get('/getUserById/:userId', (req, res) => {
  User.getUserById(req.params.userId, (err, user) => {
    if (err) throw err
    else {
      res.json(user);
    }
  })
})



router.post('/changePwd', (req, res, next) => {
  var userId = req.body.userId;
  var changedPwd = req.body.changedPwd;
  const query = {_id:userId};
  User.find(query, (err, user) => {
    if (err) throw err;
    User.comparePassword(req.body.currentPwd, user[0].password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(changedPwd, salt, (err, hash) => {
            if(err) throw err;
            var userId=userId;
            const query={_id:userId};
          user[0].password = hash;
          user[0].save().then((user)=>{
            return res.json({ success: true, msg: 'Password is updated' });
          },
          (err)=>{
            return res.json({ success: false, msg: 'Password is  not updated' });
          }
        )
          });
        });
      }
      else {
        return res.json({ success: false, msg: 'Wrong password' });
      }
    });
 });
});

module.exports = router;
