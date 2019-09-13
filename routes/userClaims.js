const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const UserClaim = require('../models/userClaims');
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
    // User.findOne({ _id: userId }).then(user => {
    //     if (user) {
    //       User.update({ _id: userId }, { $set: {
    //         firstName : req.body.user.firstName,
    //              lastName : req.body.user.lastName,
    //                dob : req.body.user.dob,
    //               gender : req.body.user.gender,
    //               phone : req.body.user.phone,
    //                email : req.body.user.email,
    //                address : req.body.user.address
    //          } }, (err, ass) => {
    //         (err) => { res.json({ success: false, msg: 'fail' }); },
    //           (ass) => { res.json({ success: true, msg: 'success' }); }
    //       })
    //     } else {
    //       console.log('err');
    //     }
    //   })
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

module.exports = router;