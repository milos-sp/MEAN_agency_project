import express from 'express';
import { UserController } from '../controllers/user.controller';
import multer from 'multer';

const userRouter = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'src/uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, Math.floor(new Date().getTime()/1000) + '-' + file.originalname); //new Date().toISOString().slice()
    }
  });
  
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png') { //samo jpg i png
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

  const upload = multer({
    storage: storage,
    fileFilter: fileFilter
  });

userRouter.route('/login').post(
    (req, res)=> new UserController().login(req, res)
)

userRouter.route('/register').post(
    (req, res)=> new UserController().register(req, res)
)

userRouter.route('/getUsers').get(
    (req, res)=> new UserController().getUsers(req, res)
)

userRouter.route('/getAllClients').get(
  (req, res)=> new UserController().getAllClients(req, res)
)

userRouter.route('/getUserByUsername').post(
  (req, res)=> new UserController().getUserByUsername(req, res)
)

userRouter.route('/:username/uploadAvatarImage').post(upload.single('avatar_image'), (req, res, next)=>{
    new UserController().uploadAvatarImage(req, res, next)
})

userRouter.route('/addDefaulltImage').post(
    (req, res)=> new UserController().addDefaultImage(req, res)
)

userRouter.route('/editClient').post(
  (req, res)=> new UserController().editClient(req, res)
)

userRouter.route('/getPendingUsers').get(
  (req, res)=> new UserController().getPendingUsers(req, res)
)

userRouter.route('/accept').post(
  (req, res)=> new UserController().accept(req, res)
)

userRouter.route('/reject').post(
  (req, res)=> new UserController().reject(req, res)
)

userRouter.route('/deleteUser').post(
  (req, res)=> new UserController().deleteUser(req, res)
)

userRouter.route('/acceptExpansionRequest').post(
  (req, res)=> new UserController().acceptExpansionRequest(req, res)
)

export default userRouter;