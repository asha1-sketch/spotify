const { json } = require("body-parser")
const music_model=require("../model/music_model")
const album_model=require("../model/album_model")
const jwt=require("jsonwebtoken")
const uploadFile=require("../services/storage")
require("dotenv").config()

async function createMusic(req, res) {
    try {
        // const token = req.cookies.token;
        // console.log(token);
        
        // if (!token) {
        //     return res.status(401).json({ message: "create account first" });
        // }
        
        // const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("decoded",decoded);
        const user=req.user
        if (user.role !== "artist") {
            return res.status(400).json({ message: "cant create music as you are not an artist" });
        }
        
        const {title} = req.body;
        const file=req.file

        const result=await uploadFile(file.buffer.toString("base64"))
        console.log(result);
        //         {
        // fileId: '69c228eb5c7cd75eb85c31c4',      
        // name: 'music1774332163296_kgPzcuhg5',    
        // size: 3399680,
        // versionInfo: { id: '69c228eb5c7cd75eb85c31c4', name: 'Version 1' },
        // filePath: '/Asha_spotify/music1774332163296_kgPzcuhg5',
        // url: 'https://ik.imagekit.io/v35itfr0b/Asha_spotify/music1774332163296_kgPzcuhg5',  
        // audioCodec: 'mp3',
        // fileType: 'non-image',
        // AITags: null,
        // description: null
        // }
        const artistbhai = await music_model.create({
            url: result.url,
            title: title,
            artist: user.id
        });
        
        res.status(201).json(artistbhai);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error creating music" });
    }
}

async function createAlbum(req,res){
    // const token=req.cookies.token
    // if(!token){
    //     return res.status(400).json({
    //         message:"create an account first"
    //     })
    // }
    try{

        // const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const user=req.user
        if(user.role!="artist"){
            return res.status(400).json({
                message:"You cannot create album"
            })
        }
        const {title,musicId}=req.body

        const album=album_model.create({
            title:title,
            artist:decoded.id,
            music:musicId
        })

        return res.status(200).json({
            message:album
        })
    }
    catch(err){
        return res.status(200).json({
            message:"bro error"
        })
    }
}

async function everymusic(req,res){
    try{
        const result= await music_model
        .find()
        .limit(10)
        .populate(["artist"])
        console.log(result);
        return res.status(200).json({
            allmusic:result
        })
    }catch(err){
        console.log("error",err);
    }
    
}

async function getMusicByID(req,res){
    const id=req.params.id
    const result=await music_model.findById(id)
    return res.status(200).json({
        message:result
    })
}


module.exports={createMusic,createAlbum,everymusic,getMusicByID}