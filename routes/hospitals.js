const express = require('express');
const router = express.Router();
const Hospital = require('../models/hospital');

// router.post('/addHosp',(req,res)=>{
//     let hospital = new Hospital({
//     name:req.body.hosp.name,
//     specialization:req.body.hosp.specialization,
//     location:req.body.hosp.location,
//     address:req.body.hosp.address,
//     pointOfContact:req.body.hosp.pointOfContact,
// });

// Hospital.addHospital(hospital,(err,hosp)=>{

//   (err)=>{res.json({success:false,msg:'failed to add hospital'})},
//   (hosp)=>{
//     console.log('hospital added');
//       res.json({success:true,msg:'successfully added hospital'})
    
//     }
// })

// });


router.post('/addHosp',(req,res)=>{
    let hospital = new Hospital({
        name:req.body.hosp.name,
        specialization:req.body.hosp.specialization,
        location:req.body.hosp.location,
        address:req.body.hosp.address,
        pointOfContact:req.body.hosp.pointOfContact,
    });
    Hospital.addHospital(hospital,(err,hospital)=>{
    if(err){
        res.json({success: false, msg:'Failed to add hospital'});
    }
    else{
      res.json({success:true,msg:'Successfully added hospital'});
    }
  })
  })






router.get('/getHosp',(req,res)=>{
    Hospital.find(function(err,hosp){
     if(err){console.log(err)}
     else{res.json(hosp);}
   })
 });

router.get('/deleteHosp/:hospid',(req,res)=>{
Hospital.deleteHospital(req.params.hospid,(err,success)=>{
    if(err) throw err;
    else{
    res.json({success: true, msg:'Deleted hospital'});
    }
})
});


router.post('/editHosp/:hospid',(req,res)=>{
Hospital.findById(req.params.hospid,(err,hosp)=>{
    if(!hosp){
    res.json({success: false, msg:'Unable to load doc'});
    }
    else{
    hosp.name=req.body.hosp.name,
    hosp.specialization=req.body.hosp.specialization,
    hosp.location=req.body.hosp.location,
    hosp.address=req.body.hosp.address,
    hosp.pointOfContact=req.body.hosp.pointOfContact,
    hosp.save().then((hosp)=>{
        res.json({success: true, msg:'Updated'});
    },
    err=>{
        res.json({success: false, msg:'Update failed'});
    }
    );
    }
})
})

router.get('/getHospitalList',(req,res)=>
    Hospital.getHospitalList((err,hospitals)=>{
        if(err) throw err
        else {
            res.json(hospitals)
        }
    })
)


module.exports = router;