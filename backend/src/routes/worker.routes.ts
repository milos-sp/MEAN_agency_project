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

export default workerRouter;