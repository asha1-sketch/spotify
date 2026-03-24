const mongoose=require("mongoose")
const schema=new mongoose.Schema({
    url:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    artist:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    }

})

const music_model=mongoose.model("music",schema)
module.exports=music_model