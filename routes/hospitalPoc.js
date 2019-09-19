const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const HospitalPoc = require('../models/hospitalPoc');
const User = require('../models/user');
module.exports = router;


router.post('/addPoc',(req,res)=>{
    let user = new User({
        firstName: req.body.poc.firstName,
        lastName: req.body.poc.lastName,
        gender: req.body.poc.gender,
        phone: req.body.poc.phone,
        email: req.body.poc.email,
        address: req.body.poc.address,
        password: req.body.poc.password,
        userrole: 'poc',
    });
User.addUser(user, (err, user) => {
    if (err) {
      res.json({ success: false, msg: 'Failed to add employee' });
    }
    else {
     // res.json({ success: true, msg: 'Successfully added employee' });
     let hospitalPoc = new HospitalPoc({
                    pocId:user._id,
                    hospitalId:mongoose.Types.ObjectId(req.body.poc.hospitalId),
                });
                hospitalPoc.save().then((poc)=>{
                    res.json({success: true, msg:'Saved'});
                })
    }
  })
})

router.get('/getPocs/:hospitalId',(req,res)=>{
HospitalPoc.find({
    hospitalId: {
                 $eq: mongoose.Types.ObjectId(req.params.hospitalId)
                }
    }).then((hsptl)=>{
        let result = hsptl.map(a => a.pocId);
        User.find({
                _id: { $in:result }
        }).then((usr)=>{
             res.json(usr);
        });
    });
 })


router.get('/deletePoc/:pocId',(req,res)=>{
    HospitalPoc.deletePoc(req.params.pocId,(err,deleted)=>{
        if(err) throw err;
        else{
           User.deleteUser(req.params.pocId,(err,deleted)=>{
               if (err) throw err;
               else{
                   res.json({success:true})
               }
           })
            
        }
    })
})

router.post('/editPoc',(req,res)=>{
    
    // HospitalPoc.findById(req.body.poc.pocId,(err,poc)=>{
    //     if(!poc){
    //     res.json({success: false, msg:'Unable to load doc'});
    //     }
    //     else{
    //     hosp.name=req.body.hosp.name,
    //     hosp.specialization=req.body.hosp.specialization,
    //     hosp.location=req.body.hosp.location,
    //     hosp.address=req.body.hosp.address,
    //     hosp.pointOfContact=req.body.hosp.pointOfContact,
    //     hosp.save().then((hosp)=>{
    //         res.json({success: true, msg:'Updated'});
    //     },
    //     err=>{
    //         res.json({success: false, msg:'Update failed'});
    //     }
    //     );
    //     }
    // })
    console.log(req.body);
    var pocId = req.body.pocId;
    console.log(pocId);
    User.findById(mongoose.Types.ObjectId(req.body.pocId),(err,poc)=>{
        if(!poc){
            res.json({success:false,msg:'unable to load doc'});
        }else{
            User.update({ _id: pocId }, { $set: {
                firstName : req.body.poc.firstName,
                     lastName : req.body.poc.lastName,
                      gender : req.body.poc.gender,
                      phone : req.body.poc.phone,
                       email : req.body.poc.email,
                       address : req.body.poc.address
                 } }, (err, ass) => {
                (err) => { res.json({ success: false, msg: 'fail' }); },
                  (ass) => { res.json({ success: true, msg: 'success' }); }
              })
        }
    })
})