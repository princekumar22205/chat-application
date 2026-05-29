const jwt = require("jsonwebtoken");
const User = require("../model/schema");
require("dotenv").config();

const protectRoute = async (req,res,next)=>{
    try{
        let token;
        const header = req.headers.authorization || req.headers.token;

        if(header && header.startsWith('Bearer')){
            token = header.split(" ")[1];
        } else if(header){
            token = header;
        }
        if(!token){
            return res.status(401).json({success:false, message:"user is not authorized or token is missing"});
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_JWT);
        const user = await User.findOne({email: decoded.user.email}).select("-password");
        
        if(!user){
            return res.status(401).json({success:false, message: "user not found"});
        }
        req.user = user;
        req.user_id = user._id;
        next();
    }
    catch(err){
        console.log(err);
        return res.status(401).json({success:false, message:err.message});
    }
}

module.exports = protectRoute ;