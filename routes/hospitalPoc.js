const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const HospitalPoc = require('../models/hospitalPoc');
const User = require('../models/user');
module.exports = router;


router.post('/addPoc',(req,res)=>{
    let user = new User({
        firstName: req.body.poc.firstName,
        lastName: req.body.poc.lastName,
        gender: req.body.poc.gender,
        phone: req.body.poc.phone,
        email: req.body.poc.email,
        address: req.body.poc.address,
        password: req.body.poc.password,
        userrole: 'poc',
    });
    user.save().then((user)=>{
        let hospitalPoc = new HospitalPoc({
            pocId:user._id,
            hospitalId:mongoose.Types.ObjectId(req.body.poc.hospitalId),
        });
        hospitalPoc.save().then((poc)=>{
            res.json({success: true, msg:'Saved'});
        })
    },(err)=>{
        res.json({success: false, msg:'not Saved'});
    })
})

router.get('/getPocs/:hospitalId',(req,res)=>{
HospitalPoc.find({
    hospitalId: {
                    $eq: mongoose.Types.ObjectId(req.params.hospitalId)
                }
    }).then((hsptl)=>{
        let result = hsptl.map(a => a.pocId);
        User.find({
                _id: { $in:result }
        }).then((usr)=>{
             console.log(usr);
        });
    });
 })