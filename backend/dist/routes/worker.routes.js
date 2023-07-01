"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const worker_controller_1 = require("../controllers/worker.controller");
const workerRouter = express_1.default.Router();
workerRouter.route('/getWorkersForAgency').post((req, res) => new worker_controller_1.WorkerController().getWorkersForAgency(req, res));
workerRouter.route('/getAvailableWorkersForAgency').post((req, res) => new worker_controller_1.WorkerController().getAvailableWorkersForAgency(req, res));
workerRouter.route('/hireWorker').post((req, res) => new worker_controller_1.WorkerController().hireWorker(req, res));
workerRouter.route('/dismissWorker').post((req, res) => new worker_controller_1.WorkerController().dismissWorker(req, res));
workerRouter.route('/deleteWorker').post((req, res) => new worker_controller_1.WorkerController().deleteWorker(req, res));
workerRouter.route('/insertWorker').post((req, res) => new worker_controller_1.WorkerController().insertWorker(req, res));
workerRouter.route('/getRequest').get((req, res) => new worker_controller_1.WorkerController().getRequest(req, res));
workerRouter.route('/addRequest').post((req, res) => new worker_controller_1.WorkerController().addRequest(req, res));
exports.default = workerRouter;
//# sourceMappingURL=worker.routes.js.map