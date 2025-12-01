
import multer from 'multer';
import path from 'path'
import { fileURLToPath } from 'url'
const ___dirname = path.dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
    destination:(req, file , cb)=>{
        cb(null, path.join(___dirname, "../uploads"))
    },
    filename:(req,file,cb)=>{
        const ext = path.extname(file.originalname)
        const filename = Date.now()+file.originalname;
        cb(null, filename)
    }
});

const fileFilter = (req, file,cb)=>{
    const allowedTypes = /jpeg|jpg|png/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedTypes.test(file.mimetype)

    if(extname && mimeType){
        return cb(null , true)
    }else{
        return cb(new Error("Only (jpeg|jpg|png) format images are allowed "))
    }
};

const uploads = multer({
    storage,
    limits:{fileSize:1024*1024*5}, //5mb
    fileFilter
})

export default uploads