const mongoose = require('mongoose');
const config = require('../config/database');
const PackageSchema = mongoose.Schema({
    name:{type:String,required:true},
    insProvider:{type:String,required:true},
    insProviderId:{type:String,required:true},
    insCategory:{type:String,required:true},
    insCategoryId:{type:String,required:true},
    maxSumAssured:{type:Number,required:true},
    minSumAssured:{type:Number,required:true},
    premiumAmnt:{type:Number,required:true},
    maxNoOfMembersCovered:{type:Number,required:true},
    maxMaturity:{type:String,required:true},
    networkHospitals:{type:[String],required:true},
    diseaseCoverageWaitingPeriod:{type:Number,required:true},
    waitingPeriod:{type:Number,required:true},
    requiredDocs:{type:[String],required:true},
    diseasesCovered:{type:[String],required:true},
    diseasesUnCovered:{type:[String],required:true}

});
const Package = module.exports = mongoose.model('Package',PackageSchema);
module.exports.addPackage = function(package,callback){
     package.save(callback);
}

module.exports.getPackages = function(insurerId,callback){
    Package.find({insProviderId:insurerId},callback)
}

module.exports.deletePackage = function(packageId,callback){
    const query={_id:packageId};
    Package.deleteOne(query,callback);
}
module.exports.getPackageById = function(id, callback){
    Package.findById(id, callback);
}

module.exports.getPackagesByInsurer = function(insurer,callback){
    var insId = insurer;
    const query={insProviderId:insId};
    Package.find(query,callback);
}

module.exports.getPackageDetails = function(package,callback){
    var packId=package;
    const query={_id:packId};
    Package.findOne(query,callback);
}

module.exports.getCoveredDiseases = function(packageId,callback){
    var packageId = packageId;
    const query = {_id:packageId};
    Package.find({ _id: packageId }, { diseasesCovered: 1 ,_id:0},callback)
}