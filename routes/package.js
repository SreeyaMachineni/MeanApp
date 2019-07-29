const express = require('express');
const router = express.Router();
const Package = require('../models/package');


router.post('/addPackage',(req,res)=>{
    let package = new Package({
        name:req.body.package.name,
        insProvider:req.body.package.insProvider,
        insCategory:req.body.package.insCategory,
        maxSumAssured:req.body.package.maxSumAssured,
        minSumAssured:req.body.package.minSumAssured,
        premiumAmnt:req.body.package.premiumAmnt,
        maxNoOfMembersCovered:req.body.package.maxNoOfMembersCovered,
        maxMaturity:req.body.package.maxMaturity,
        networkHospitals:req.body.package.networkHospitals,
        diseaseCoverageWaitingPeriod:req.body.package.diseaseCoverageWaitingPeriod,
        waitingPeriod:req.body.package.waitingPeriod
    });
    Package.addPackage(package,(err,package)=>{
    if(err){
        res.json({success: false, msg:'Failed to add package'});
    }
    else{
      res.json({success:true,msg:'Successfully added package'});
    }
  })
})


router.get('/getPackages',(req,res)=>{  
    Package.getPackages((err,packages)=>{
        if(err) throw err;
        else{
        res.json(packages);
        }
    })
})



router.get('/deletePackage/:packageId',(req,res)=>{
    Package.deletePackage(req.params.packageId,(err,success)=>{
        if(err) throw err;
        else{
        res.json({success: true, msg:'Deleted package'});
        }
    })
})


router.post('/editPackage/:packageId',(req,res)=>{
    Pacakge.findById(req.params.packageId,(err,package)=>{
        if(!package){
        res.json({success: false, msg:'Unable to load doc'});
        }
        else{
            package.name                         = req.body.package.name,
            package.insProvider                  = req.body.package.insProvider,
            package.insCategory                  = req.body.package.insCategory,
            package.maxSumAssured                = req.body.package.maxSumAssured,
            package.minSumAssured                = req.body.package.minSumAssured,
            package.premiumAmnt                  = req.body.package.premiumAmnt,
            package.maxNoOfMembersCovered        = req.body.package.maxNoOfMembersCovered,
            package.maxMaturity                  = req.body.package.maxMaturity,
            package.networkHospitals             = req.body.package.networkHospitals,
            package.diseaseCoverageWaitingPeriod = req.body.package.diseaseCoverageWaitingPeriod,
            package.waitingPeriod                = req.body.package.waitingPeriod
        insurer.save().then((insurer)=>{
            res.json({success: true, msg:'Updated'});
        },
        err=>{
            res.json({success: false, msg:'Update failed'});
        }
        );  
        }
    })
})

module.exports = router;