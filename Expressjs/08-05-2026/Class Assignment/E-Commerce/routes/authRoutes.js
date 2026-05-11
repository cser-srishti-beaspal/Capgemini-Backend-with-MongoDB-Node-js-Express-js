const express = require("express");
const router = express.Router();
const {register,verifyOtp,login,refreshToken} = require("../controllers/authController.js");
const {protect,authorize} = require("../middleware/authMiddleware.js");
router.post("/register",register);
router.post("/verify-otp",verifyOtp);
router.post("/login",login);
router.post("/refresh-token",refreshToken);
router.get("/profile",protect,(req,res)=>{
    res.status(200).json({
        message:"profile fetch successfully",
        "name" : req.user.name,
        "email" : req.user.email,
        "role" : req.user.role
    })
})

module.exports = router;