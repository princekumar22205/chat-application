const express = require("express");
const cors = require("cors");
const http = require("http");
const connectDB = require("./config/mongodb");
const messageRouter = require("./routes/messageRoutes");
const {Server} = require("socket.io");

//created express and http server
const app = express();
const server = http.createServer(app)

//intialize socket.io server
const io =  new Server(server,{
    cors: {origin: "*"}
})

//store online users
const userSocketMap = {};

//Socket.io connection handler
io.on("connection", (socket)=>{
    const userId = socket.handshake.query.userId;
    console.log("user connected", userId);

    if(userId){
        userSocketMap[userId] = socket.id;
    }

    // emit online users to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", ()=>{
        console.log("user disconnected", userId);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})

require("dotenv").config();
const port = process.env.PORT || 5000
connectDB();


//middleware setup
app.use(cors());//
app.use(express.json({limit:"4mb"}));//limit so that max size of image is 4MB

app.use('/api/auth',require("./routes/userRoutes"));
app.use("/api/message",messageRouter);

server.listen(port, ()=>{
    console.log(`server is running on ${port}`)
})

module.exports = {io,userSocketMap}