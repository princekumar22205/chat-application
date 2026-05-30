const User = require("../model/schema");
const bcrypt =require("bcrypt");
const jwt =require("jsonwebtoken");
const cloudinary = require("cloudinary");


const signUp = async(req,res)=>{
    try{
    const {email,username,password,bio} = req.body;
    if(!email || !username || !password || !bio){
        return res.status(400).json({success:false, message:"all credentials are required"});
    }

    const isAvailable = await User.findOne({email});
    if(isAvailable){
        return res.status(400).json({success:false, message:"user is already registered"});
    }

    const hashedPassword = await bcrypt.hash(password,10);
    const user = await User.create({
        email,
        username,
        password:hashedPassword,
        bio
    })
    const accessToken = jwt.sign(
    {
        user:{
            id:user.id,
            email:user.email,
            username:user.username
        }
    },
    process.env.ACCESS_TOKEN_JWT,
    { expiresIn: "15m" }
    )

    if(user){
        return res.status(200).json({success:true,token:accessToken, message:"Successfully Registered!", userData:{_id:user.id, email:user.email, username:user.username}});
    }
    else{
        return res.status(400).json({success:false, message:"users data is not valid"});
    }
    }
    catch(err){
        console.log(err);
        return res.status(400).json({success:false, message:err.message});
    }
}



//POST 
//LOGIN
const login = async(req,res)=>{
    try{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({success:false, message:"both email and password are required!"});
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
        
        return res.status(200).json({success:true, token:accesstoken, userData:{_id:exists.id, email:exists.email, username:exists.username}, message: "user is successfully logged in"});
    }
    else{
        return res.status(400).json({success:false, message:"email or password is not valid"});
    }
    }
    catch(err){
        console.log(err);
        return res.status(400).json({success:false, message:err.message});
    }
};

//controller to check if user is authenticated
const checkAuth = (req,res)=>{
    return res.json({success:true, user: req.user});
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
     return res.json({success:true, user: updatedUser});
    } 
    catch (error) {
        console.log(error.message);
        return res.json({success:false, message:error.message});
     }
}

module.exports = {signUp, login, checkAuth,updateProfile};