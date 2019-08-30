const mongoose = require('mongoose');
const config = require('../config/database');
const NotificationSchema = mongoose.Schema({
    // userId:{type:String},
    // comments:{type:String},
    userId:{type:String},
    notifyAbout:{type:String},
    category:{type:String},
    comments:{type:String}
   
});
const Notification = module.exports = mongoose.model('Notification',NotificationSchema);
module.exports.addNotification = function(userId,comment,docName,callback){
    let notification = new Notification({
        userId:userId,
        comments:docName+' has been rejected due to the following reason'+comment
    });
    notification.save(callback)
}
module.exports.getNotifications = function(userId,callback){
    const query = {userId:userId};
    Notification.find(query,callback);
}

module.exports.addClaimNotification=function(userId,notifyTo,username,callback){
    let notification = new Notification({
        userId:notifyTo,
        notifyAbout:userId,
        category:'claim',
        comments:username+' has made a claim'
    });
    notification.save(callback);
}

