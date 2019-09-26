const mongoose = require('mongoose');
const config = require('../config/database');
// Menu Schema
const MenuSchema = mongoose.Schema({
    menuId:{type:Number},
    menuName:{type:String},
    path:{type:String},
    accessTo:{type:[String]}
});

const Menu = module.exports = mongoose.model('Menu', MenuSchema);

module.exports.getMenuByRole = function(role, callback){
    const query = {accessTo: role};
    Menu.find(query,callback);
}
