const mongoose=require("mongoose")
const schema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["user","artist"],
        default:"user"
    }
})

const user_model=mongoose.model("user",schema)
module.exports=user_model