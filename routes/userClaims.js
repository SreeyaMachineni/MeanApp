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
module.exports = router;