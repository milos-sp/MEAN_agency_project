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
        cb(null, Math.floor(new Date().getTime() / 1000) + '-' + file.originalname);
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
userRouter.route('/getAllClients').get((req, res) => new user_controller_1.UserController().getAllClients(req, res));
userRouter.route('/getUserByUsername').post((req, res) => new user_controller_1.UserController().getUserByUsername(req, res));
userRouter.route('/:username/uploadAvatarImage').post(upload.single('avatar_image'), (req, res, next) => {
    new user_controller_1.UserController().uploadAvatarImage(req, res, next);
});
userRouter.route('/addDefaulltImage').post((req, res) => new user_controller_1.UserController().addDefaultImage(req, res));
userRouter.route('/editClient').post((req, res) => new user_controller_1.UserController().editClient(req, res));
userRouter.route('/getPendingUsers').get((req, res) => new user_controller_1.UserController().getPendingUsers(req, res));
userRouter.route('/accept').post((req, res) => new user_controller_1.UserController().accept(req, res));
userRouter.route('/reject').post((req, res) => new user_controller_1.UserController().reject(req, res));
userRouter.route('/deleteUser').post((req, res) => new user_controller_1.UserController().deleteUser(req, res));
userRouter.route('/addUser').post((req, res) => new user_controller_1.UserController().addUser(req, res));
userRouter.route('/acceptExpansionRequest').post((req, res) => new user_controller_1.UserController().acceptExpansionRequest(req, res));
userRouter.route('/changePassword').post((req, res) => new user_controller_1.UserController().changePassword(req, res));
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map