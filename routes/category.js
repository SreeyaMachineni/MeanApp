const express = require('express');
const router = express.Router();
const Category = require('../models/category');

// router.post('/addCategory',(req,res)=>{
    
//     let category = new Category({
//         name:req.body.category.name,
//         details:req.body.category.details
//     });
//     Category.addCategory(category,(err,category)=>{
//         (err)=>{res.json({success:false,msg:'failed to add category'})},
//         (category)=>{res.json({success:true,msg:'added category'})}
//     })
// })

router.post('/addCategory',(req,res)=>{
    let category = new Category({
        name:req.body.category.name,
        details:req.body.category.details
    });
    Category.addCategory(category,(err,category)=>{
  if(err){
      res.json({success: false, msg:'Failed to add category'});
  }
  else{
    res.json({success:true,msg:'Successfully added category'});
  }
})
})








router.get('/getCategories',(req,res)=>{
    Category.find(function(err,cat){
     if(err)throw err;
     else{res.json(cat);}
   })
 })

 router.get('/getCategoryList',(req,res)=>
 Category.getCategoryList((err,categories)=>{
     if(err) throw err
     else {
        
         res.json(categories)
     }
 })
)

 router.get('/deleteCategory/:categoryId',(req,res)=>{
    Category.deleteCategory(req.params.categoryId,(err,success)=>{
      if(err) throw err;
      else{
        res.json({success: true, msg:'Deleted category'});
      }
    })
  })


  router.post('/editCategory/:categoryId',(req,res)=>{
     Category.editCategory(req.params.categoryId,req.body.category,(err,category)=>{
         (err)=>{res.json({success:false,msg:'failed to update'})},
         (category)=>{res.json({success:true,msg:'updated category'})}
     })
 })

module.exports = router;