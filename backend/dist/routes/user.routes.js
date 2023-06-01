"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const multer_1 = __importDefault(require("multer"));
const userRouter = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png') { //samo jpg i png
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
const upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: fileFilter
});
userRouter.route('/login').post((req, res) => new user_controller_1.UserController().login(req, res));
userRouter.route('/register').post((req, res) => new user_controller_1.UserController().register(req, res));
userRouter.route('/getUsers').get((req, res) => new user_controller_1.UserController().getUsers(req, res));
userRouter.route('/getUserByUsername').post((req, res) => new user_controller_1.UserController().getUserByUsername(req, res));
userRouter.route('/:username/uploadAvatarImage').post(upload.single('avatar_image'), (req, res, next) => {
    new user_controller_1.UserController().uploadAvatarImage(req, res, next);
});
userRouter.route('/addDefaulltImage').post((req, res) => new user_controller_1.UserController().addDefaultImage(req, res));
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map