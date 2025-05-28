const express=require('express')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
//const dotenv = require("dotenv");
const User=require('../model/Model')
const router=express.Router()
const JWT_SECRET=process.env.JWT_SECRET||'SECRETTOKEN'



router.post("/signup",async(req,res)=>{
    const {username,email,password}=req.body;
    try{
        const find=await User.findOne({email})
        if(find){
            return res.status(400).json({message:"user already exist!"})
        }
        if(password.length<6)return res.status(400).json({message:"password must be more then 6 digits"})

        const passwordHash=await bcrypt.hash(password,10)


        const newUser=new User({username,email,password:passwordHash})
        
         await newUser.save();

         return res.status(201).json({message:"registered successfully"})

    }
    catch(error){
        res.status(500).json({message:"error in registering",error:error.message})
    }
})




router.post("/login",async(req,res)=>{
    const {email,password}=req.body;

try{
    const user=await User.findOne({email})
    if(!user){
        return res.status(500).json({message:"No user Found"})
    }
    const isMatch=await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(500).json({message:"Credentials do not match"})
    }
        
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

        
        return res.status(200).json({
          message: "Login successful",
          token,
          user: { id: user._id, username: user.username, email: user.email },
        });
    
    
}
catch(error){
    res.status(500).json({ message: "Error logging in", error: error.message });
 
}
})

module.exports = router;
