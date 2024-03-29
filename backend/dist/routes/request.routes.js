"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const request_controller_1 = require("../controllers/request.controller");
const requestRouter = express_1.default.Router();
requestRouter.route('/addRequest').post((req, res) => new request_controller_1.RequestController().addRequest(req, res));
requestRouter.route('/getRequestsA').post((req, res) => new request_controller_1.RequestController().getRequestsA(req, res));
requestRouter.route('/getRequestsC').post((req, res) => new request_controller_1.RequestController().getRequestsC(req, res));
requestRouter.route('/reject').post((req, res) => new request_controller_1.RequestController().reject(req, res));
requestRouter.route('/sendOffer').post((req, res) => new request_controller_1.RequestController().sendOffer(req, res));
requestRouter.route('/rejectOffer').post((req, res) => new request_controller_1.RequestController().rejectOffer(req, res));
requestRouter.route('/acceptOffer').post((req, res) => new request_controller_1.RequestController().acceptOffer(req, res));
requestRouter.route('/startJob').post((req, res) => new request_controller_1.RequestController().startJob(req, res));
requestRouter.route('/endJob').post((req, res) => new request_controller_1.RequestController().endJob(req, res));
requestRouter.route('/pay').post((req, res) => new request_controller_1.RequestController().pay(req, res));
requestRouter.route('/getAllJobs').get((req, res) => new request_controller_1.RequestController().getAllJobs(req, res));
requestRouter.route('/deleteRequests').post((req, res) => new request_controller_1.RequestController().deleteRequests(req, res));
requestRouter.route('/stopJob').post((req, res) => new request_controller_1.RequestController().stopJob(req, res));
requestRouter.route('/getCancelRequests').get((req, res) => new request_controller_1.RequestController().getCancelRequests(req, res));
requestRouter.route('/rejectStopRequest').get((req, res) => new request_controller_1.RequestController().rejectStopRequest(req, res));
requestRouter.route('/deleteJob').get((req, res) => new request_controller_1.RequestController().deleteJob(req, res));
exports.default = requestRouter;
//# sourceMappingURL=request.routes.js.map