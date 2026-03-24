const express=require("express")
const app=require("./src/app")

app.get("/",(req,res)=>{
    res.send("first")
})
app.listen(3000,(req,res)=>{
    console.log("at 3000");
})