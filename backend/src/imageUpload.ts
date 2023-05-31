import userRouter from "./routes/user.routes";

const multer = require('multer');

export class imageUpload{
    uploadAvatarImage = ()=>{
        const imageStorage = multer.diskStorage({
            destination: (req, file, cb)=>{ cb(null, 'uploads/')},
            filename: (req, file, cb)=> { 
                req.body.file = file.originalname
                cb(null, file.originalname)
            }
        })
    
        return multer({storage: imageStorage})
    }
}



