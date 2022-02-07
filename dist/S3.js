"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const File_1 = require("./models/File");
const crypto = require("crypto");
require('dotenv').config();
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_ID,
    secretAccessKey: process.env.SECRET_KEY
});
function uploadFile(file) {
    var id = crypto.randomBytes(5).toString('hex');
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: id + '_' + file.name,
        Body: file.data
    };
    // Uploading files to the bucket
    s3.upload(params, function (err, data) {
        if (err)
            throw err;
        console.log(`File uploaded successfully ` + data.Location);
        let file = new File_1.File();
        file.location = data.Location;
        file.save();
        return data.Location;
    });
}
exports.default = uploadFile;
//# sourceMappingURL=S3.js.map