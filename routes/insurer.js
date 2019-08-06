const express = require('express');
const router = express.Router();
const Insurer = require('../models/insurer');

router.post('/addInsurer',(req,res)=>{
    let insurer = new Insurer({
        name:req.body.insurer.name,
        location:req.body.insurer.location,
        address:req.body.insurer.address,
        pointOfContact:req.body.insurer.pointOfContact,
    });
    Insurer.addInsurer(insurer,(err,insurer)=>{
    if(err){
        res.json({success: false, msg:'Failed to add insurer'});
    }
    else{
      res.json({success:true,msg:'Successfully added insurer'});
    }
  })
  })

router.get('/getInsurers',(req,res)=>{  
    Insurer.getInsurers((err,insurers)=>{
        if(err) throw err;
        else{
        res.json(insurers);
        }
    })
})

router.get('/deleteInsurer/:insurerId',(req,res)=>{
Insurer.deleteInsurer(req.params.insurerId,(err,success)=>{
    if(err) throw err;
    else{
    res.json({success: true, msg:'Deleted insurer'});
    }
})
})
  
router.post('/editInsurer/:insurerId',(req,res)=>{
Insurer.findById(req.params.insurerId,(err,insurer)=>{
    if(!insurer){
    res.json({success: false, msg:'Unable to load doc'});
    }
    else{
    insurer.name=req.body.insurer.name,
    insurer.location=req.body.insurer.location,
    insurer.address=req.body.insurer.address,
    insurer.pointOfContact=req.body.insurer.pointOfContact,
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

router.get('/getInsuresList',(req,res)=>
    Insurer.getInsurersList((err,insurers)=>{
        if(err) throw err
        else {
            res.json(insurers)
        }
    })
)



module.exports = router;