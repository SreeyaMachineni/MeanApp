const express = require('express');
const router = express.Router();
const Doc = require('../models/docs');
const Notify = require('../models/notification');
const multer = require('multer');
const path   = require('path');
const DIR = './Frontend/src/assets/images';
let storage = multer.diskStorage({
    destination: (req, file, cb) => {  cb(null, DIR);  },
    filename: (req, file, cb) => { cb(null,new Date().getTime().toString()+file.originalname); }
});
let upload = multer({storage: storage});
router.post('/upload/:id',upload.single('photo'), function (req, res) {
    if (!req.file) {
        return res.send({success: false});
      } else {
        var photo = {
            path:'assets/images/'+req.file.filename,
            userId:req.body.id,
            name:req.file.originalname,
            fileType:req.file.mimetype,
            isVerified:null
        }
        var document = new Doc(photo);
        document.save(function(err){
            if(err){
             return res.send({success: false})
            }
            return res.send({ success: true })
        })
      }
});


router.get('/getDocs/:id', function(req, res) {
  Doc.getDocs(req.params.id,(err,docs)=>{
    if(err) throw err
    else {
        res.json(docs)
    }
  })    
});

router.post('/approveDoc',function(req,res){
    Doc.approveDoc(req.body.docId,req.body.approve,req.body.docName,(err,approve)=>{
        if(err) throw err
        else{
            res.send({success:true})
        }
    })
})

router.post('/rejectDoc',function(req,res){
    Doc.rejectDoc(req.body.docId,req.body.approve,req.body.reason,req.body.docName,(err,approve)=>{
        if(err) throw err
        else{
            Notify.addNotification(req.body.userId,req.body.reason,req.body.docName,(err,notify)=>{
                if(err) throw err
                else{
                    
                    res.send({success:true})
                }
            })

            //res.send({success:true})
        }
    })
})






module.exports=router;