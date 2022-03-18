import { File } from "./models/File";
const crypto = require("crypto");

require('dotenv').config()

const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_ID,
    secretAccessKey: process.env.SECRET_KEY
});

async function uploadFile(file) {
    var id = crypto.randomBytes(5).toString('hex');

    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: id + '_' +file.name, 
        Body: file.data
    };


    // Uploading files to the bucket

    const s3Upload = new Promise((resolve, reject) => {
        s3.upload(params, function(err, data) {
            if (err) throw err;
            let image = new File();

            image.location = data.Location;
            resolve(image.save());
        });   
     })

 

    let image = await s3Upload

    return image
}

export default uploadFile;