const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        require: true,
        unique: true,

    },
    email:{
        type:String,
        reuire:true,
        unique:true,

    },
    password:{
        type:String,
        require:true,

    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    }

})

module.exports = mongoose.model("User", userSchema);