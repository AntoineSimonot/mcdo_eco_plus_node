import express from 'express';
import { File } from '../models/File';
import uploadFile from '../S3';

let router = express.Router();

router.post('/files', async (req, res) => {
    if (req.files) {
        // @ts-ignore
        let avatar = req.files.avatar;

        uploadFile(avatar);

        return res.json({
            status: 200,
            message: 'File is uploaded',
        });
    }

    return res.json({
        status: 400,
        message: 'No file uploaded'
    });

})

//get one file
router.get('/files/:id', async (req, res) => {
    const image = await File.findOne({where: {id: req.params.id}});

    if (image) {
        return res.json({
            status: 200,
            data: image
        });
    }

    return res.json({
        status: 400,
        message: 'No file found'
    });
})

export default router;  

