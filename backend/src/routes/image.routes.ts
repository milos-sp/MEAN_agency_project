import express from 'express';
import { ImageController } from '../controllers/image.controller';

const imageRouter = express.Router();

imageRouter.route('/getImages').get(
    (req, res)=> new ImageController().getImages(req, res)
)

imageRouter.route('/getImageByUsername').post(
    (req, res)=> new ImageController().getImageByUsername(req, res)
)

imageRouter.route('/deleteImage').post(
    (req, res)=> new ImageController().deleteImage(req, res)
)

export default imageRouter;