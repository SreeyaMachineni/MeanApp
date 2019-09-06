const mongoose = require('mongoose');
const config = require('../config/database');
const NotificationSchema = mongoose.Schema({
    // userId:{type:String},
    // comments:{type:String},
    userId:{type:String},
    notifyAbout:{type:String},
    category:{type:String},
    comments:{type:String},
    verified:{type:Boolean}
   
});
const Notification = module.exports = mongoose.model('Notification',NotificationSchema);
module.exports.addNotification = function(userId,comment,docName,callback){
    let notification = new Notification({
        userId:userId,
        category:'docs',
        comments:docName+' has been rejected due to the following reason'+comment,
        verified:false
    });
    notification.save(callback)
}
module.exports.getNotifications = function(userId,callback){
    const query = {userId:userId,verified:false};
    Notification.find(query,callback);
}

module.exports.addClaimNotification=function(userId,notifyTo,username,callback){
    let notification = new Notification({
        userId:notifyTo,
        notifyAbout:userId,
        category:'claim',
        comments:username+' has made a claim',
        verified:false
    });
    notification.save(callback);
}

module.exports.addPackageNotification = function(userId,notifyTo,username,packageName,callback){
    console.log(userId,notifyTo,username,packageName);
    let notification = new Notification({
        userId:notifyTo,
        notifyAbout:userId,
        category:'package',
        comments:username+' updated package: '+packageName,
        verified:false
    });
    notification.save(callback)
}

