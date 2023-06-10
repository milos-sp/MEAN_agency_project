import express from 'express';
import { RequestController } from '../controllers/request.controller';

const requestRouter = express.Router();

requestRouter.route('/addRequest').post(
    (req, res)=> new RequestController().addRequest(req, res)
)

export default requestRouter;