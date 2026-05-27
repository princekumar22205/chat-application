const express = require("express");
const protectRoute = require("../middleware/auth");
const { getUsersForSidebar, getMessage, markMessageAsSeen, sendMessage } = require("../controller/messageController");

const messageRouter = express.Router();

messageRouter.get("/users", protectRoute, getUsersForSidebar);
messageRouter.get("/:id", protectRoute, getMessage);
messageRouter.put("mark/:id", protectRoute, markMessageAsSeen);
messageRouter.post("/send/:id", protectRoute, sendMessage);


module.exports = messageRouter;