const mongoose = require('mongoose');
const config = require('../config/database');
var Schema = mongoose.Schema;

const DoctorVisitSchema = mongoose.Schema({
    userId:{ type: Schema.Types.ObjectId,required:true},
    hospital:{ type: String,required:true},
    purpose:{ type: String,required:true},
    dateOfVisit:{ type: Date,required:true},
})

const DoctorVisit = module.exports = mongoose.model('DoctorVisit',DoctorVisitSchema);

module.exports.getVisits = function(userId,callback){
    const query={userId: mongoose.Types.ObjectId(userId)}
    DoctorVisit.find(query,callback);
}
module.exports.deleteVisit = function(visitId,callback){
    var visitId = visitId;
    const query = {_id:visitId};
    DoctorVisit.deleteOne(query,callback);
}
