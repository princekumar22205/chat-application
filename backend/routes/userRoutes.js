const express = require("express");
const User = require("../model/schema");
const bcrypt= require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const {signUp,login, updateProfile, checkAuth} = require("../controller/userController");
const protectRoute = require("../middleware/auth");


router.post("/signup",signUp)

//REST API  for login
router.post("/login",login)
router.put("/updateProfile",protectRoute,updateProfile)
router.get("/check",protectRoute,checkAuth)


module.exports = router;