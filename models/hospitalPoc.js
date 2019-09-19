const mongoose = require('mongoose');
const config = require('../config/database');
const User = require('../models/user');
var Schema = mongoose.Schema;

const HospitalPocSchema = mongoose.Schema({
    hospitalId:{ type: Schema.Types.ObjectId,required:true},
    pocId:{ type: Schema.Types.ObjectId,required:true},
})
const HospitalPoc = module.exports = mongoose.model('HospitalPoc',HospitalPocSchema);

module.exports.getPocs = function(hospitalId,callback){

    User.aggregate(
        [
            {
                "$match":{
                    "_id":{
                        "$in":HospitalPoc.distinct("pocId",{"hospitalId":hospitalId})
                    }
                }
            }
        ],callback
    );


}
module.exports.deletePoc = function(pocId,callback){
    var pocId = pocId;
    const query = {pocId:mongoose.Types.ObjectId(pocId)};
    HospitalPoc.deleteOne(query,callback);
}

