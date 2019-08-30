const mongoose = require('mongoose');
const config = require('../config/database');
var Schema = mongoose.Schema;
const UserClaimSchema = mongoose.Schema({
   userId:{ type: Schema.Types.ObjectId,required:true},
   packageId:{type:String,required:true},
   packageName:{type:String,required:true},
   hospital:{type:String,required:true},
   disease:{type:String,required:true},
   location:{type:String,required:true},
   dateOfSurgery:{type:Date,required:true}
});
const UserClaim = module.exports = mongoose.model('UserClaim',UserClaimSchema);

module.exports.adduserClaim=function(claim,callback){
    claim.save(callback);
}

module.exports.getUserClaims = function(userId,callback){
    const query={userId:userId};
    UserClaim.find(query,callback);
}