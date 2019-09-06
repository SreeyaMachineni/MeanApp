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

router.get('/updateNotification/:notificationId',(req,res)=>{
    var notificationId=req.params.notificationId;
    const query={_id:notificationId};
    Notification.updateOne(query,{ $set: {verified:true}},(err,updated)=>{
        (err)=>{
            throw err;
        },(updated)=>{
            res.json({ success: true, msg: 'success' });
        }
    })
})


module.exports = router;