
const express = require('express');
const router = express.Router();
const DoctorVisit = require('../models/doctorVisit');
const mongoose = require('mongoose');
router.post('/addDoctorVisit',(req,res)=>{
    
       let doctorVisit = new DoctorVisit({
        userId:mongoose.Types.ObjectId(req.body.doctorVisit.userId),
        hospital:req.body.doctorVisit.hospital,
        purpose:req.body.doctorVisit.purpose,
        dateOfVisit:req.body.doctorVisit.dateOfVisit
    });
    doctorVisit.save().then((doctorVisit)=>{
        res.json({success: true, msg:'Saved'});
    })
  })


router.post('/editDoctorVisit',(req,res)=>{
    var visitId = req.body.doctorVisit._id;
    DoctorVisit.find({_id:mongoose.Types.ObjectId(visitId)},(err,visit)=>{
        if(!visit){
            res.json({success:false,msg:'unable to load doc'});
        }else{
            DoctorVisit.update({ _id: mongoose.Types.ObjectId(visitId) }, { $set: {
                userId:req.body.doctorVisit.userId,
                hospital:req.body.doctorVisit.hospital,
                purpose:req.body.doctorVisit.purpose,
                dateOfVisit:req.body.doctorVisit.dateOfVisit
                 } }, (err, visit) => {
                (err) => { res.json({ success: false, msg: 'fail' }); },
                  (visit) => { res.json({ success: true, msg: 'success' }); }
              })
        }
    })
})


router.get('/doctorVisits/:userId',(req,res)=>{
    DoctorVisit.getVisits(req.params.userId,(err,doctorVisits)=>{
        if(err) throw err
        else {
            res.json(doctorVisits)
        }
    })
})

router.get('/deleteVisit/:visitId',(req,res)=>{
    DoctorVisit.deleteVisit(req.params.visitId,(err,success)=>{
        if(err) throw err;
        else{
        res.json({success: true, msg:'Deleted visit'});
        }
    })
    });

module.exports = router;