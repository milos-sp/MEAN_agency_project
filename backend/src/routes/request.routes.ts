import express from 'express';
import { RequestController } from '../controllers/request.controller';

const requestRouter = express.Router();

requestRouter.route('/addRequest').post(
    (req, res)=> new RequestController().addRequest(req, res)
)

requestRouter.route('/getRequestsA').post(
    (req, res)=> new RequestController().getRequestsA(req, res)
)

requestRouter.route('/reject').post(
    (req, res)=> new RequestController().reject(req, res)
)

requestRouter.route('/sendOffer').post(
    (req, res)=> new RequestController().sendOffer(req, res)
)

export default requestRouter;