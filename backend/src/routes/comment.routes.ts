import express from 'express';
import { CommentController } from '../controllers/comment.controller';

const commentRouter = express.Router();

commentRouter.route('/getCommentsForAgency').post(
    (req, res)=> new CommentController().getCommentsForAgency(req, res)
)

export default commentRouter;