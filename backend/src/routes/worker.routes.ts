import express from 'express';
import { WorkerController } from '../controllers/worker.controller';

const workerRouter = express.Router();

workerRouter.route('/getWorkersForAgency').post(
    (req, res)=> new WorkerController().getWorkersForAgency(req, res)
)

workerRouter.route('/getAvailableWorkersForAgency').post(
    (req, res)=> new WorkerController().getAvailableWorkersForAgency(req, res)
)

workerRouter.route('/hireWorker').post(
    (req, res)=> new WorkerController().hireWorker(req, res)
)

workerRouter.route('/dismissWorker').post(
    (req, res)=> new WorkerController().dismissWorker(req, res)
)

workerRouter.route('/deleteWorker').post(
    (req, res)=> new WorkerController().deleteWorker(req, res)
)

workerRouter.route('/insertWorker').post(
    (req, res)=> new WorkerController().insertWorker(req, res)
)

workerRouter.route('/getRequest').get(
    (req, res)=> new WorkerController().getRequest(req, res)
)

workerRouter.route('/addRequest').post(
    (req, res)=> new WorkerController().addRequest(req, res)
)

workerRouter.route('/getWorker').get(
    (req, res)=> new WorkerController().getWorker(req, res)
)

workerRouter.route('/editWorker').post(
    (req, res)=> new WorkerController().editWorker(req, res)
)

workerRouter.route('/deleteRequest').post(
    (req, res)=> new WorkerController().deleteRequest(req, res)
)

export default workerRouter;