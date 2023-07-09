import express from 'express';
import { RequestController } from '../controllers/request.controller';

const requestRouter = express.Router();

requestRouter.route('/addRequest').post(
    (req, res)=> new RequestController().addRequest(req, res)
)

requestRouter.route('/getRequestsA').post(
    (req, res)=> new RequestController().getRequestsA(req, res)
)

requestRouter.route('/getRequestsC').post(
    (req, res)=> new RequestController().getRequestsC(req, res)
)

requestRouter.route('/reject').post(
    (req, res)=> new RequestController().reject(req, res)
)

requestRouter.route('/sendOffer').post(
    (req, res)=> new RequestController().sendOffer(req, res)
)

requestRouter.route('/rejectOffer').post(
    (req, res)=> new RequestController().rejectOffer(req, res)
)

requestRouter.route('/acceptOffer').post(
    (req, res)=> new RequestController().acceptOffer(req, res)
)

requestRouter.route('/startJob').post(
    (req, res)=> new RequestController().startJob(req, res)
)

requestRouter.route('/endJob').post(
    (req, res)=> new RequestController().endJob(req, res)
)

requestRouter.route('/pay').post(
    (req, res)=> new RequestController().pay(req, res)
)

requestRouter.route('/getAllJobs').get(
    (req, res)=> new RequestController().getAllJobs(req, res)
)

requestRouter.route('/deleteRequests').post(
    (req, res)=> new RequestController().deleteRequests(req, res)
)

requestRouter.route('/stopJob').post(
    (req, res)=> new RequestController().stopJob(req, res)
)

requestRouter.route('/getCancelRequests').get(
    (req, res)=> new RequestController().getCancelRequests(req, res)
)

requestRouter.route('/rejectStopRequest').get(
    (req, res)=> new RequestController().rejectStopRequest(req, res)
)

requestRouter.route('/deleteJob').get(
    (req, res)=> new RequestController().deleteJob(req, res)
)

export default requestRouter;