const user_model=require("../model/user_model")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
require("dotenv").config()

async function registeruser(req,res){
    const {username , email , password , role="user"}=req.body

    const isuserexist=await user_model.findOne({email})
    
    if (isuserexist){
        return res.status(400).json({
            message:"user already exists."
        })
    }

    try{
        const hash=await bcrypt.hash(password,10)
        const user= await user_model.create({
            username:username,
            email:email,
            password:hash,
            role:role
        })

        const token=jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET)
        res.cookie("token",token)
        res.status(200).json({
            message:"user registered successfully",
            Rtoken:token
        })

        
    }catch(err){
        console.log("error:",err);
    }
}

async function loginUser(req,res){
    const {username,email,password}=req.body
   const isuserexist= await user_model.findOne({email})

    if(!isuserexist){
        return res.status(400).json({
            message:"user does not exist."
        })
    }
    const ispasswordvalid=await bcrypt.compare(password,isuserexist.password)
    if(!ispasswordvalid){
        return res.status(400).json({
            message:"wrong password"
        })
    }

   const token = jwt.sign({id:isuserexist._id,role:isuserexist.role},process.env.JWT_SECRET)
   res.cookie("token",token)
   res.status(200).json({
    message:"login successfull"   ,
    Ltoken:token
})

}

async function logout(req,res){
    res.clearCookie("token")
    return res.status(200).json({
        message:"ok bye logout done."
    })
}

module.exports={registeruser,loginUser,logout}