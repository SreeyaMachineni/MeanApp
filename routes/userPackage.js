const express = require('express');
const router = express.Router();
const UserPackage = require('../models/UserPackage');

router.post('/addUserPackage',(req,res)=>{
    let userPackage = new UserPackage({
        username:req.body.package.username,
        category:req.body.package.category,
        insurer:req.body.package.insurer,
        package:req.body.package.package,
        activeFrom:req.body.package.activeFrom,
        activeTo:req.body.package.activeTo,
        isAssigned:req.body.package.isAssigned,
        assignedTo:req.body.package.assignedTo        
    });
    UserPackage.addUserPackage(userPackage,(err,userPackage)=>{
    if(err){
        res.json({success: false, msg:'Failed to add user package'});
    }
    else{
      res.json({success:true,msg:'Successfully added user package'});
    }
  })
  })

router.get('/getUserPackages',(req,res)=>{  
    UserPackage.getUserPackages((err,userPackages)=>{
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
        userPackage.username = req.body.package.username,
        userPackage.category = req.body.package.category,
        userPackage.insurer = req.body.package.insurer,
        userPackage.package = req.body.package.package,
        userPackage.activeFrom = req.body.package.activeFrom,
        userPackage.activeTo = req.body.package.activeTo,
        userPackage.isAssigned=req.body.package.isAssigned,
        userPackage.assignedTo=req.body.package.assignedTo
    
        userPackage.save().then((userPackage)=>{
        res.json({success: true, msg:'Updated'});
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



module.exports = router;