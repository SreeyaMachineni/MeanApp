const express = require('express');
const router = express.Router();
const Notification = require('../models/notification');
const User = require('../models/user');
const mongoose = require('mongoose');
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

router.post('/addNotification',(req,res)=>{
    let notication;
    if(req.body.contact.userrole == 'user'){
        notication = new Notification({  
            category:req.body.contact.regarding,
            comments:req.body.contact.description,
            userId:req.body.contact.userEmpId,
            notifyAbout:req.body.contact.userId,
            verified:false,
        });
        notication.save().then((err,notication)=>{
            (err)=>{res.json({success:false})},
            (notication)=>{
                res.json({success:true})
            }
        })
        
        
    }else if(req.body.contact.userrole == 'employee'){
        notication = new Notification({  
            category:req.body.contact.regarding,
            comments:req.body.contact.description,
            userId:req.body.contact.userEmpId,    
            verified:false,
        });
        notication.save().then((err,notication)=>{
            (err)=>{res.json({success:false})},
            (notication)=>{
                res.json({success:true})
            }
        })
      
    }
    else if(req.body.contact.userrole == 'poc'){
        if(req.body.contact.notifyOption == 'Notify Employee'){
            var userId = req.body.contact.userEmpId;
            User.findOne({ _id: userId }).then(emp => {
                if (emp) {
                notication = new Notification({  
                    category:req.body.contact.regarding,
                    comments:req.body.contact.description,
                    userId:emp.userEmpId,    
                    verified:false,
                });
                notication.save().then((err,notication)=>{
                    (err)=>{res.json({success:false})},
                    (notication)=>{
                        res.json({success:true})
                    }
                })
                } else {
                  console.log('err');
                }
              })
        }else{
            var userId = req.body.contact.userEmpId;
            User.findOne({ _id: userId }).then(emp => {
                if (emp) {
                notication = new Notification({  
                    category:req.body.contact.regarding,
                    comments:req.body.contact.description,
                    userId:emp.userEmpId,    
                    verified:false,
                });
               
                notication.save((err,notified)=>{
                    notication = new Notification({  
                        category:req.body.contact.regarding,
                        comments:req.body.contact.description,
                        userId:req.body.contact.userEmpId,
                        verified:false,
                    });
                    notication.save().then((err,notified)=>{
                        if(notified){
                            res.json({success:true});
                        }
                    })
                })
                } else {
                  console.log('err');
                }
              });
        }
       
    }
   
})


module.exports = router;