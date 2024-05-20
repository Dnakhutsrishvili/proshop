import path from 'path';
import multer from 'multer';
import express from 'express';

const router=express.Router();
const __dirname = path.resolve();

const storage=multer.diskStorage({
    destination(req,file,cb){
        cb(null,'uploads/')
    },
    filename(req,file,cb){
        console.log(file)
        cb(null,`${Date.now()}${path.extname(file.originalname)}`)
    }
})

function fheckFileType(file,cb){
    const filetypes= /jpg|jpeg|png/;
    const extname=filetypes/test(path.extname(file.originalname.toLowerCase()));
    const mimetype=filetypes.test(file.mimetype);
    if(extname&&mimetype){
        return cb(null,true);
    }else{
        cb('images only')
    }
}

const upload= multer({
    storage,
})

router.post('/', upload.single('image'),(req,res)=>{
    const imagePath = req.file.path.replace(/\\/g, '/');

    console.log(imagePath)
    res.send({
        message:'Image uploaded',
        image:`/${imagePath}`
    })
})
export default router;
