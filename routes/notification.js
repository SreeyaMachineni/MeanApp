const express = require('express');
const router = express.Router();
const Notification = require('../models/notification');

router.get('/getNotifications/:userId',(req,res)=>{
    Notification.getNotifications(req.params.userId,(err,notications)=>{
        if(err) throw err;
        else{
        res.json(notications);
        }
    })
})


module.exports = router;