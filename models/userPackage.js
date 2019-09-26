const mongoose = require('mongoose');
const config = require('../config/database');
const UserPackageSchema = mongoose.Schema({
    userId:{type:String,required:true},
    username:{type:String,required:true},
    insurerId:{type:String,required:true},
    packageId:{type:String,required:true},
    categoryId:{type:String,required:true},
    insurerName:{type:String,required:true},
    packageName:{type:String,required:true},
    categoryName:{type:String,required:true},
    activeFrom:{type:Date,required:true},
    activeTo:{type:Date,required:true},
    notify:{type:Boolean}
});
const UserPackage = module.exports = mongoose.model('UserPackage',UserPackageSchema);
module.exports.addUserPackage=function(userPackage,callback){
    userPackage.save(callback);
}
module.exports.deleteUserPackage = function(packageId,callback){
    const query={_id:packageId};
    UserPackage.deleteOne(query,callback);
}

module.exports.editUserPackage = function(packageId,package,callback){
    const query = {_id:packageId}
    UserPackage.findById(packageId,(err,userPackage)=>{
        if(!package){
        console.log('couldnt find');
        }
        else{
            package.username = package.username;
            package.categoryId = package.categoryId;
            package.insurerId = package.insurerId;
            package.packageId = package.packageId;
            package.categoryName = package.categoryName;
            package.insurerName = package.insurerName;
            package.packageName = package.packageName;
            package.activeFrom = package.activeFrom;
            package.activeTo = package.activeTo;
            package.notify=package.notify;
         package.save(callback); 
}
    });
}

module.exports.getNumOfUsersToAssign = function(callback){
    const query={isAssigned:false};
    UserPackage.find(query).count(callback);
    
}

module.exports.getUserPackages = function(userId,callback){
    const query ={userId:userId}
    UserPackage.find(query,callback);
}