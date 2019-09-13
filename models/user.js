const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema({
  firstName: {type: String,required:true},
  lastName: {type: String,required:true},
  gender:{type:String,require:true},
  email: {type: String,required: true},
  password: {type: String,required: true},
  phone:{type:String,require:true},
  address:{type:String,require:true},
  isAssigned:{type:Boolean},
  assignedTo:{type:String,required:false},
  userEmpId:{type:String,required:false},
  userrole:{type:String},
  pan:{type:String},
  passport:{type:String},
  qualification:{type:String},
  maritalStatus:{type:String},
  dob: {type: Date},

});

const User = module.exports = mongoose.model('User', UserSchema);



module.exports.getUsersByRole=function(userrole,callback){
 
  const query = {userrole:userrole};
  User.find(query,callback);
}

module.exports.getUserByUsername = function(firstName, callback){
  const query = {firstName: firstName}
  User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){  
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.deleteUser=function(empid,callback){
  const query = {_id:empid};
  User.deleteOne(query,callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}

module.exports.getNumOfUsersToAssign = function(callback){
  const query={isAssigned:false};
  User.find(query).count(callback);
}

module.exports.getUsers = function(callback){
  const query={userrole:'user'}
  User.find(query,callback);
}
module.exports.getUnassignedUsers = function(callback){
  const query={userrole:'user',isAssigned:false}
  User.find(query,callback);
}
module.exports.assignUser = function(user,empId,empName,callback){
   
  const query={firstName:user};
  User.update(query,{$set:{assignedTo:empName,isAssigned:true,userEmpId:empId}},callback)
}

module.exports.getEmpUsers = function(empId,callback){
  const query={userEmpId:empId}
  User.find(query,callback);
}

module.exports.getUserById = function(userId,callback){
  var userId = userId;
  const query={_id:userId}
  User.findOne(query,callback);
}
module.exports.changePwd = function(userId,changedPwd,callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(changedPwd, salt, (err, hash) => {
      if(err) throw err;
      var userId=userId;
      const query={_id:userId};
    });
  });
}
