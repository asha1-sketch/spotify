const express=require("express")
const router=express.Router()
const music=require("../controllers/music_control")
const auth_middle=require("../middleware/auth")
const multer=require("multer")

const upload=multer({
    storage:multer.memoryStorage()
})

router.post("/create",auth_middle.authArtist,upload.single("music"),music.createMusic)

router.post("/create_album",auth_middle.authArtist, music.createAlbum)

router.get("/",auth_middle.authUser,music.everymusic)

router.get("/:id",auth_middle.authUser,music.getMusicByID)


module.exports=router