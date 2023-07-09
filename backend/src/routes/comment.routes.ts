import express from 'express';
import { CommentController } from '../controllers/comment.controller';

const commentRouter = express.Router();

commentRouter.route('/getCommentsForAgency').post(
    (req, res)=> new CommentController().getCommentsForAgency(req, res)
)

commentRouter.route('/getComment').post(
    (req, res)=> new CommentController().getComment(req, res)
)

commentRouter.route('/addComment').post(
    (req, res)=> new CommentController().addComment(req, res)
)

commentRouter.route('/editComment').post(
    (req, res)=> new CommentController().editComment(req, res)
)

export default commentRouter;