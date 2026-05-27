const jwt = require("jsonwebtoken");
const User = require("../model/schema");
require("dotenv").config();

const protectRoute = async (res,req,next)=>{
    try{
        let token;
        const header = req.headers.authorization;

        if(header && header.startsWith('Bearer')){
            token = header.split(" ")[1];
        }
        if(!token){
            res.status(401);
            throw new Error("user is not authorized or token is missing");
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_JWT);
        const user = await User.findOne(decoded.userId).select("-password");
        
        if(!user){
            res.json({message: "user not found"});
        }
        req.user = user;
        next();
    }
    catch(err){
        console.log(err);
        res.json({message:err.message});
    }
}

module.exports = protectRoute ;