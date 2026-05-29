const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const mongoose = require("mongoose");

const connectDB = async ()=>{
    try{
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("database is connected");
    }
    catch(err){
        console.log("MongoDB Connection Error:", err.message);
        console.log(err);
        process.exit(1);
    }

}

module.exports = connectDB;