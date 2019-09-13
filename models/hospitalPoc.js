const mongoose = require('mongoose');
const config = require('../config/database');
const User = require('../models/user');
var Schema = mongoose.Schema;

const HospitalPocSchema = mongoose.Schema({
    hospitalId:{ type: Schema.Types.ObjectId,required:true},
    pocId:{ type: Schema.Types.ObjectId,required:true},
})
const HospitalPoc = module.exports = mongoose.model('HospitalPoc',HospitalPocSchema);

// module.exports.addHospital = function(hospital,callback){
   
//     hospital.save(callback);
// }
module.exports.getPocs = function(hospitalId,callback){
    
    // Users.aggregate(
    //     [
    //         { "$match": {
    //             "_id": { 
    //                 "$in": db.hospitalpocs.distinct("pocId",{ "hospitalId": "ObjectId("5d38450c31ea69155427765d")" })
    //             }
    //         }}
    //     ])
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
