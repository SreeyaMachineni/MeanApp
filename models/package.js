const mongoose = require('mongoose');
const config = require('../config/database');
const PackageSchema = mongoose.Schema({
    name:{type:String,required:true},
    insProvider:{type:String,required:true},
    insCategory:{type:String,required:true},
    maxSumAssured:{type:Number,required:true},
    minSumAssured:{type:Number,required:true},
    premiumAmnt:{type:Number,required:true},
    maxNoOfMembersCovered:{type:Number,required:true},
    maxMaturity:{type:String,required:true},
    networkHospitals:{type:[String],required:true},
    diseaseCoverageWaitingPeriod:{type:Number,required:true},
    waitingPeriod:{type:Number,required:true},
    requiredDocs:{type:[String],required:true}
});
const Package = module.exports = mongoose.model('Package',PackageSchema);
module.exports.addPackage = function(package,callback){
    console.log(package);
     package.save(callback);
}

module.exports.getPackages = function(callback){
    Package.find({},callback)
}

module.exports.deletePackage = function(packageId,callback){
    const query={_id:packageId};
    Package.deleteOne(query,callback);
}
module.exports.getPackageById = function(id, callback){
    Package.findById(id, callback);
}

module.exports.getPackagesByInsurer = function(insurer,callback){
    console.log(insurer);
    const query={insProvider:insurer};
    Package.find(query,callback);
}

module.exports.getPackageDetails = function(package,callback){
    const query={name:package};
    Package.findOne(query,callback);
}