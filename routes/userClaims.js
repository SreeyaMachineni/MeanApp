const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const UserClaim = require('../models/userClaims');
const User = require('../models/user');
const HospitalPoC = require('../models/hospitalPoc');
const Hospital = require('../models/hospital');
const Notify = require('../models/notification');

router.post('/addUserClaim',(req,res)=>{
    let userClaim = new UserClaim({
        userId:mongoose.Types.ObjectId(req.body.claim.userId),
        packageId:req.body.claim.packageId,
        packageName:req.body.claim.packageName,
        hospital:req.body.claim.hospital,
        disease:req.body.claim.disease,
        location:req.body.claim.location,
        dateOfSurgery:req.body.claim.dateOfSurgery,
        status:'Pending'
    });
    UserClaim.adduserClaim(userClaim,(err,claim)=>{
    if(err){
        res.json({success: false, msg:'Failed to add claim'});
    }
    else{
      Notify.addClaimNotification(req.body.claim.userId,req.body.notify,req.body.username,(err,notify)=>{
        if(err) throw err
        else{
            res.send({success:true})
        }
    })
    }
  })
});


router.get('/getUserClaims/:userId',(req,res)=>{
    UserClaim.getUserClaims(mongoose.Types.ObjectId(req.params.userId),(err,claims)=>{
        if(err) throw err;
        else{
        res.json(claims);
        }
    })
    });

router.get('/deleteUserClaim/:claimId',(req,res)=>{
    UserClaim.deleteClaim(req.params.claimId,(err,deleted)=>{
        if(err) throw err;
        else{
            res.json({succes:true})
        }
    })
})




router.post('/editUserClaim',(req,res)=>{
    var claimId= req.body.claim._id;
    UserClaim.findOne({ _id: claimId }).then(claim => {
        if (claim) {
          UserClaim.update({ _id: claimId }, { $set: {
            userId:mongoose.Types.ObjectId(req.body.claim.userId),
        packageId:req.body.claim.packageId,
        packageName:req.body.claim.packageName,
        hospital:req.body.claim.hospital,
        disease:req.body.claim.disease,
        location:req.body.claim.location,
        dateOfSurgery:req.body.claim.dateOfSurgery,
             } }, (err, updated) => {
            (err) => { res.json({ success: false, msg: 'fail' }); },
              (updated) => { 
                  res.json({ success: true, msg: 'success' });
                 }
          })
        } else {
          console.log('err');
        }
      })
  var claimId= req.body.claim._id;
      UserClaim.findById(claimId,(err,userClaim)=>{
      if(!userClaim){
      res.json({success: false, msg:'Unable to load doc'});
      }
      else{
        userClaim.userId =mongoose.Types.ObjectId(req.body.claim.userId),
        userClaim.packageId=req.body.claim.packageId,
        userClaim.packageName=req.body.claim.packageName,
        userClaim.hospital=req.body.claim.hospital,
        userClaim.disease=req.body.claim.disease,
        userClaim.location=req.body.claim.location,
        userClaim.dateOfSurgery=req.body.claim.dateOfSurgery,
        userClaim.save().then((userClaim)=>{
          Notify.editClaimNotification(req.body.claim.userId,req.body.notify,req.body.username,(err,notify)=>{
              if(err) throw err
              else{
                  res.send({success:true})
              }
          })
      },
      err=>{
          res.json({success: false, msg:'Update failed'});
      }
      );  
      }
  })
});

router.post('/setStatus',(req,res)=>{
    console.log(req.body);
    var claimId = req.body.claimId;
    UserClaim.findOne({_id:claimId}).then(claim=>{
        if(claim){
            UserClaim.update({_id:claimId},{$set:{status:req.body.status.claimStatus,comments:req.body.status.comments}},(err,upd)=>{
                (err)=>{res.json({success:false,msg:'fail'});},
                (upd)=>{res.json({success:true,msg:'pass'})}
            })
        }
    })

})

router.get('/getEmpClaims/:empId',(req,res)=>{
    User.aggregate([
        {$match:{userEmpId:req.params.empId}},
        {
            $lookup:{
                from:"userclaims",
                localField:"_id",
                foreignField:"userId",
                as:"claims"
            }
        },{
            $unwind:"$claims"
        }
    ])
    .exec().then((claims)=>{
        res.json(claims);
    }).catch((err)=>{
        console.log(err);
    })
});
router.get('/getClaimsByHospital/:pocId',(req,res)=>{
    var pocId = req.params.pocId;
    const query = {pocId:mongoose.Types.ObjectId(pocId)};
    HospitalPoC.find({ pocId: mongoose.Types.ObjectId(pocId) }).then(poc => {
        if (poc) {
            var hospId = poc[0].hospitalId;
            Hospital.find({_id:hospId}).then(hosp=>{
                if(hosp){  
                    UserClaim.find({hospital:hosp[0].name}).then(claims=>{
                        if(claims){
                            console.log(claims);
                            res.json(claims);
                        }
                    })
                }
            })
        }
    },(err)=>{
        throw err;
    })
    
})

module.exports = router;