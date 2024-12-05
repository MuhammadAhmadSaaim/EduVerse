const express = require("express");
const router=express.Router();
const {getUserProfile,updateProfile} = require("../controllers/userController");
const auth = require("../middleware/auth");

//get user profile
router.get("/getProfile",auth,getUserProfile);
// router.get("/test", (req, res) => {
//     console.log("test");
// })
//update user profile
router.put("/updateProfile",auth,updateProfile);

module.exports=router;