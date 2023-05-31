"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageUpload = void 0;
const multer = require('multer');
class imageUpload {
    constructor() {
        this.uploadAvatarImage = () => {
            const imageStorage = multer.diskStorage({
                destination: (req, file, cb) => { cb(null, 'uploads/'); },
                filename: (req, file, cb) => {
                    req.body.file = file.originalname;
                    cb(null, file.originalname);
                }
            });
            return multer({ storage: imageStorage });
        };
    }
}
exports.imageUpload = imageUpload;
//# sourceMappingURL=imageUpload.js.map