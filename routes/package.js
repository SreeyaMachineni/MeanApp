const express = require('express');
const router = express.Router();
const Package = require('../models/package');
const Insurer = require('../models/insurer');
const Category = require('../models/category');

router.post('/addPackage',(req,res)=>{
        var insId = req.body.package.insProviderId;
        var categoryId = req.body.package.insCategoryId;
        var insName;
        var categoryName;
        Insurer.findOne({_id:insId}).then(insurer=>{
            if(insurer){
              insName = insurer.name;
              Category.findOne({_id:categoryId}).then(category=>{
                if(category){
                    categoryName = category.name;
                    let package = new Package({
                        name:req.body.package.name,
                        insProviderId:req.body.package.insProviderId,
                        insCategoryId:req.body.package.insCategoryId,
                        insProvider :req.body.package.insProvider,
                        insCategory:req.body.package.insCategory,
                        maxSumAssured:req.body.package.maxSumAssured,
                        minSumAssured:req.body.package.minSumAssured,
                        premiumAmnt:req.body.package.premiumAmnt,
                        maxNoOfMembersCovered:req.body.package.maxNoOfMembersCovered,
                        maxMaturity:req.body.package.maxMaturity,
                        networkHospitals:req.body.package.networkHospitals,
                        diseaseCoverageWaitingPeriod:req.body.package.diseaseCoverageWaitingPeriod,
                        waitingPeriod:req.body.package.waitingPeriod,
                        requiredDocs:req.body.package.requiredDocs,
                      // requiredDocs:reqdcs,
                        diseasesCovered:req.body.package.diseasesCovered,
                        diseasesUnCovered:req.body.package.diseasesUnCovered
                    });
                   
                    Package.addPackage(package,(err,package)=>{
                    if(err){
                        res.json({success: false, msg:'Failed to add package'});
                    }
                    else{
                      res.json({success:true,msg:'Successfully added package'});
                    }
                  })
                }else{
                  console.log('err');
                }
              });
            }else{
              console.log('err');
            }
          });
         
  
})


router.get('/getPackagesByInsurer/:insurer',(req,res)=>{
    Package.getPackagesByInsurer(req.params.insurer,(err,package)=>{
        if(err) throw err;
        else{
            res.json(package)
        }
    })
})



router.get('/getPackages/:insurerId',(req,res)=>{  
    Package.getPackages(req.params.insurerId,(err,packages)=>{
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
    Package.findById(req.params.packageId,(err,package)=>{
        if(!package){
        res.json({success: false, msg:'Unable to load doc'});
        }
        else{

            var insId = req.body.package.insProviderId;
            var categoryId = req.body.package.insCategoryId;
            var insName;
            var categoryName;
            Insurer.findOne({_id:insId}).then(insurer=>{
                if(insurer){
                  insName = insurer.name;
                }else{
                  console.log('err');
                }
              });
              Insurer.findOne({_id:categoryId}).then(category=>{
                if(category){
                    categoryName = category.name;
                }else{
                  console.log('err');
                }
              });
            package.name                         = req.body.package.name,
            package.insProviderId                        = req.body.package.insProviderId,
            package.insCategoryId                        = req.body.package.insCategoryId,
            package.insProviderName                          = req.body.package.insCategory,
            package.insCategoryName                          = req.body.package.insCategory,
            package.maxSumAssured                = req.body.package.maxSumAssured,
            package.minSumAssured                = req.body.package.minSumAssured,
            package.premiumAmnt                  = req.body.package.premiumAmnt,
            package.maxNoOfMembersCovered        = req.body.package.maxNoOfMembersCovered,
            package.maxMaturity                  = req.body.package.maxMaturity,
            package.networkHospitals             = req.body.package.networkHospitals,
            package.diseaseCoverageWaitingPeriod = req.body.package.diseaseCoverageWaitingPeriod,
            package.waitingPeriod                = req.body.package.waitingPeriod
            package.requiredDocs                 = req.body.package.requiredDocs
            diseasesCovered                      = req.body.package.diseasesCovered,
            diseasesUnCovered                    = req.body.package.diseasesUnCovered,
            package.save().then((package)=>{
            res.json({success: true, msg:'Updated'});
        },
        err=>{
            res.json({success: false, msg:'Update failed'});
            throw err;
            
        }
        );  
        }
    })
})


router.get('/getPackageDetails/:packge',(req,res)=>{
    Package.getPackageDetails(req.params.packge,(err,package)=>{
        if(err) throw err;
        else{
        res.json(package);
        }
    })
})

router.get('/getCoveredDiseases/:packageId',(req,res)=>{
    Package.getCoveredDiseases(req.params.packageId,(err,diseases)=>{
        if(err) throw err;
        else{
            res.json(diseases);
        }
    })
})
module.exports = router;