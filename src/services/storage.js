const {ImageKit} =require('@imagekit/nodejs');
require("dotenv").config()

const client = new ImageKit({
  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted
});

async function uploadFile(file){
    const response = await client.files.upload({
    file: file,
    fileName: 'music'+ Date.now(),
    folder:"Asha_spotify"
});
return response
}



module.exports=uploadFile