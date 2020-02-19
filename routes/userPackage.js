const express = require('express');
const router = express.Router();
const UserPackage = require('../models/UserPackage');
const Notify = require('../models/notification');
router.post('/addUserPackage',(req,res)=>{

    console.log(req.body);
    let userPackage = new UserPackage({
        userId:req.body.package.userId,
        username:req.body.package.username,
        categoryId:req.body.package.categoryId,
        insurerId:req.body.package.insurerId,
        packageId:req.body.package.packageId,
        categoryName:req.body.package.categoryName,
        insurerName:req.body.package.insurerName,
        packageName:req.body.package.packageName,
        activeFrom:req.body.package.activeFrom,
        activeTo:req.body.package.activeTo,
        notify:null       
    });
    UserPackage.addUserPackage(userPackage,(err,userPackage)=>{
    if(err){
        throw err;
        res.json({success: false, msg:'Failed to add user package'});
    }
    else{
        Notify.addPackageNotification(req.body.package.userId,req.body.notify,req.body.package.username,req.body.package.packageName,'added',(err,notify)=>{
            if(err) throw err
            else{
       res.json({success:true,msg:'Successfully added user package'});
            }
        })
    }
  })
  })

router.get('/getUserPackages/:userId',(req,res)=>{  

    UserPackage.getUserPackages(req.params.userId,(err,userPackages)=>{
        if(err) throw err;
        else{
        res.json(userPackages);
        }
    })
})

router.get('/deleteUserPackage/:packageId',(req,res)=>{
    UserPackage.deleteUserPackage(req.params.packageId,(err,success)=>{
    if(err) throw err;
    else{
    res.json({success: true, msg:'Deleted user package'});
    }
})
})
  
router.post('/editUserPackage/:packageId',(req,res)=>{
    
    UserPackage.findById(req.params.packageId,(err,userPackage)=>{
    if(!userPackage){
    res.json({success: false, msg:'Unable to load doc'});
    }
    else{
        userPackage.userId = req.body.package.userId,
        userPackage.username = req.body.package.username,
        userPackage.categoryId=req.body.package.categoryId,
        userPackage.insurerId=req.body.package.insurerId,
        userPackage.packageId=req.body.package.packageId,
        userPackage.categoryName=req.body.package.categoryName,
        userPackage.insurerName=req.body.package.insurerName,
        userPackage.packageName=req.body.package.packageName,
        userPackage.activeFrom = req.body.package.activeFrom,
        userPackage.activeTo = req.body.package.activeTo,
        userPackage.notify = true
        userPackage.save().then((userPackage)=>{
        Notify.addPackageNotification(req.body.package.userId,req.body.notify,req.body.package.username,req.body.package.packageName,'updated',(err,notify)=>{
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
})

router.get('/getUserPackageList',(req,res)=>
UserPackage.getUserPackageList((err,userPackages)=>{
        if(err) throw err
        else {
            res.json(userPackages)
        }
    })
)

router.get('/getNumOfUsersToAssign',(req,res)=>{
    UserPackage.getNumOfUsersToAssign((err,count)=>{
        if(err) throw err
        else{
            res.json(count)
        }
    })
})

module.exports = router;