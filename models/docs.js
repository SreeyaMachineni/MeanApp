const mongoose = require('mongoose');
const config = require('../config/database');
const DocSchema = mongoose.Schema({
    name:{type:String},
    path:  { type: String },
    userId:{type:String},
    name:{type:String},
    fileType:{type:String},
    isAccepted:{type:Boolean},
    comments:{type:String}
});
const Doc = module.exports = mongoose.model('Doc',DocSchema);
module.exports.getDocs = function(id,callback){
    Doc.find({userId:id},callback)
}
module.exports.approveDoc = function(docId,approve,docName,callback){
    var docId = docId;
    const query={_id:docId};
    Doc.update(query,{$set:{isAccepted:approve,name:docName}},callback)
}
module.exports.rejectDoc = function(docId,reject,reason,docName,callback){
    var docId = docId;
    const query = {_id:docId};
    Doc.update(query,{$set:{isAccepted:reject,comments:reason,name:docName}},callback)
}