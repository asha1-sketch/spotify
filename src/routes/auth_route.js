const express=require("express")
const router=express.Router()
const auth=require("../controllers/auth_control")
router.post("/register",auth.registeruser)
router.post("/login",auth.loginUser)
router.get("/logout",auth.logout)
module.exports=router