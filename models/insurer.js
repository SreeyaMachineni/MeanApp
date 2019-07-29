const mongoose = require('mongoose');
const config = require('../config/database');
const package = require('../models/package');
const InsurerSchema = mongoose.Schema({
    name:{type:String,required:true},
    location:{type:String,required:true},
    address:{type:String,required:true},
    pointOfContact:[{
        name:{type:String,required:true},
        phone:{type:String,required:true}
    }],
})

const Insurer = module.exports = mongoose.model('Insurer',InsurerSchema);
module.exports.addInsurer = function(insurer,callback){
    console.log(insurer);
    insurer.save(callback);
}

module.exports.getInsurer = function(callback){
    console.log('getinsurer');
    Insurer.find({},callback)
}

module.exports.deleteInsurer = function(insurerId,callback){
    const query={_id:insurerId};
    Insurer.deleteOne(query,callback);
}
module.exports.getInsurerId = function(id, callback){
    Insurer.findById(id, callback);
  }
module.exports.getInsurers = function(callback){
    Insurer.find({},callback);
}