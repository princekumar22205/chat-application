const User= require("../model/schema");
const Message = require("../model/message");
const message = require("../model/message");
const cloudinary = require("../config/cloudinary");
const {io, userSocketMap} = require("../server")

// get all users except the logged in user 
const getUsersForSidebar = async(req,res)=>{
    try {
        const userId  = req.user._id;
        const filteredUsers = await User.find({_id :{$ne :userId}}).select("-password");

        //count number of messages not seen
        const unseenMessage = {};
        const promises = filteredUsers.map(async (user)=>{
            const message = await Message.find({senderId: user._id, receiverId:userId, seen:false});
            if(message.length > 0){
                unseenMessage[user._id] = message.length;
            }
        })
        await Promise.all(promises);
        res.json({success:true,users:filteredUsers,unseenMessage});
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message: error.message});

    }
}


//get all messages for selected user

const getMessage = async (req,res)=>{
    try {
        const {id:selectedUserId} = req.params;
        const myId = req.user._id;

        const messages  = await Messages.find({ 
            $or:[
                {senderId: myId, receiverId: selectedUserId},
                {senderId: selectedUserId, receiverId: myId},
            ]
        })
        await message.updateMany({senderId: selectedUserId, receiverId: myId},{seen: true});
        res.json({success: true, message});

    } catch (error) {
        console.log(error.message);
        res.json({success:false, message: error.message})
    }
}

//api to message as seen using message id

const  markMessageAsSeen = async(req,res)=>{
    try {
        const {id} = req.params;
        await Message.findByIdAndUpdate(id,{seen: true});
        res.json({success: true})
    } catch (error) {
         console.log(error.message);
        res.json({success:false, message: error.message});
    }
}

// send message to selected user

const sendMessage = async(req,res)=>{
     try {
        const {text,image} = req.body;
        const receiverId = req.params.id;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })
//Emit the new message  to the receiver's socket

        res.json({success: true, newMessage});
     } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
     }
}
module.exports = {getUsersForSidebar,getMessage,markMessageAsSeen,sendMessage} ;