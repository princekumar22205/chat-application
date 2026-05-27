const User = require("../model/schema");
const bcrypt =require("bcrypt");
const jwt =require("jsonwebtoken");
const cloudinary = require("cloudinary");


const signUp = async(req,res)=>{
    try{
    const {email,username,password} = req.body;
    if(!email || !username || !password){
        res.status(400).json("all credentials are required");
    }

    const isAvailable = await User.findOne({email});
    if(isAvailable){
        res.status(400).json("user is already registered");
    }

    const hashedPassword = await bcrypt.hash(password,10);
    const user = await User.create({
        email,
        username,
        password:hashedPassword,
        bio
    })

    if(user){
        res.status(200).json({_id:user.id, email:user.email});
    }
    else{
        res.status(400);
        throw new Error("users data is not valid");
    }
    res.json({message:"Successfully Registered!"});
    }
    catch(err){
        console.log(err);
        res.json({message:err.message});
    }
}



//POST 
//LOGIN
const login = async(req,res)=>{
    try{
    const {email,password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("both email and password are required!");
    }

    const exists = await User.findOne({email});
    if(exists && (await bcrypt.compare(password,exists.password))){
        const accesstoken = await jwt.sign({
            user:{
                id: exists.id,
                email: exists.email,
                username: exists.username
            }
        },
            process.env.ACCESS_TOKEN_JWT,
            {expiresIn:"15m"}
        );
        
        res.status(200).json({token:accesstoken,message: "user is successfully loggined"});
    }
    else{
        res.status(400);
        throw new Error("email or password is not valid");
    }
    }
    catch(err){
        console.log(err);
        res.json({message:err.message});
    }
};

//controller to check if user is authenticated
const checkAuth = (req,res)=>{
    res.json({user: req.user});
}


//contoller to update user profile details
const updateProfile = async (req,res)=>{
    try {
     const {profilePic,bio, username}= req.body;

     const userId = req.user_id;
     let updatedUser;

     if(!profilePic){
        updatedUser = await User.findByIdAndUpdate(userId,{bio,username},{new: true});
     }
     else{
        const upload = await cloudinary.uploader.upload(profilePic);
        updatedUser = await User.findByIdAndUpdate(userId,{profilePic: upload.secure_url,bio,username},{new:true})
     }
     res.json({sucess:true, user: updatedUser});
    } 
    catch (error) {
        console.log(error.message);
        res.json({sucess:false, message:error.message});
     }
}

module.exports = {signUp, login, checkAuth,updateProfile};