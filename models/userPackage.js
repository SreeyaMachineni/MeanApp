const mongoose = require('mongoose');
const config = require('../config/database');
const UserPackageSchema = mongoose.Schema({
    username:{type:String,required:true},
    insurer:{type:String,required:true},
    package:{type:String,required:true},
    category:{type:String,required:true},
    activeFrom:{type:Date,required:true},
    activeTo:{type:Date,required:true},
    isAssigned:{type:Boolean,required:true},
    assignedTo:{type:String,required:false}
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
            package.category = package.category;
            package.insurer = package.insurer;
            package.package = package.package;
            package.activeFrom = package.activeFrom;
            package.activeTo = package.activeTo;
         
         package.save(callback);

  
}
    });
}

// module.exports.getUserPackages = function(callback){
//     UserPackage.find({ username: {$ne:null} }, { username: 1 ,_id:0},callback)
// }

module.exports.getUserPackages = function(callback){
    UserPackage.find({},callback);
}