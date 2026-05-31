
const mongoose = require("mongoose");
let isConnected = false;
const connectDB = async ()=>{
     if (isConnected) return;
    try{
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        isConnected = true;
        console.log("database is connected");
    }
    catch(err){
        console.log("MongoDB Connection Error:", err.message);
        isConnected = false;  // reset so it retries next request
        throw err;     
        // process.exit(1);
    }

}

module.exports = connectDB;