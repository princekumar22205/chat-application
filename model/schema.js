const mongoose = require("mongoose")

const  UserModel = new mongoose.Schema({
    email:{
        type:String,
        require:true,
        unique: true
    },
    username:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true,
        minlength: 6
    },
    profilePic:{
        type:String,
        default:""
    },
    bio:{
        type:String
    }
},
{
    timestamps:true
})


module.exports = mongoose.model("UserModel",UserModel);