const jwt=require("jsonwebtoken")
require("dotenv").config()

async function authArtist(req,res,next){
    const token=req.cookies.token
    if(!token){
        return res.status(400).json({
            message:"create account first"
        })
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        if(decoded.role!="artist"){
            return res.status(400).json({
                message:"you dont have access"
            })
        }
        req.user=decoded
        next()
    }
    catch(err){
        return res.status(400).json({
            message:"bro error"
        })
    }
}

async function authUser(req,res,next) {
    const token= req.cookies.token
    if(!token){
        return res.status(401).json({
            message:"create account first"
        })
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.user=decoded
    }
    catch(err){
        console.log(err);
    }
    next()
    
}
module.exports={authArtist,authUser}