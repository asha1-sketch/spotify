const mongoose=require("mongoose")

const albumschema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    music:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"music",

    }],
    artist:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
})  
const model=mongoose.model("album",albumschema)
module.exports=model