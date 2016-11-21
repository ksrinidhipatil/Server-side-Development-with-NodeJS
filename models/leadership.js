var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LeadershipSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    designation:{
        type:String,
        required:true
    },
    featured: {
        type: Boolean,
        default:false
    },
    abbr:{
        type:String,
        required:true
    }},{
    timestamps:true


});

var Leadership = mongoose.model('leader',LeadershipSchema);
module.exports = Leadership;
