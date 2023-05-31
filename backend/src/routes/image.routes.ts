import express from 'express';
import { ImageController } from '../controllers/image.controller';

const imageRouter = express.Router();

imageRouter.route('/getImages').get(
    (req, res)=> new ImageController().getImages(req, res)
)

export default imageRouter;