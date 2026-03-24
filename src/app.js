const express=require("express")
const connect=require("./db/db")
const auth_route=require("./routes/auth_route")
const music_route=require("./routes/music_route")
const cookie_parser=require("cookie-parser")

connect()
const app=express()
app.use(express.json())
app.use(cookie_parser())
app.use("/ok",auth_route)
app.use("/music",music_route)

module.exports=app