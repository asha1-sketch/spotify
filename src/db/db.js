const mongoose=require("mongoose")
async function connectdb(){
    await mongoose.connect("mongodb://localhost:27017/register")
    console.log("database connected");
}
module.exports=connectdb