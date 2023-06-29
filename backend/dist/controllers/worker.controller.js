"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkerController = void 0;
const worker_1 = __importDefault(require("../models/worker"));
class WorkerController {
    constructor() {
        this.getWorkersForAgency = (req, res) => {
            let agency = req.body.agency;
            worker_1.default.find({ 'agency': agency }, (err, workers) => {
                if (err)
                    console.log(err);
                else
                    res.json(workers);
            });
        };
        this.getAvailableWorkersForAgency = (req, res) => {
            let agency = req.body.agency;
            worker_1.default.find({ 'agency': agency, 'property': null, 'room': null }, (err, workers) => {
                if (err)
                    console.log(err);
                else
                    res.json(workers);
            });
        };
        this.hireWorker = (req, res) => {
            let id = req.body.id;
            let property = req.body.property;
            let room = req.body.room;
            worker_1.default.findOneAndUpdate({ '_id': id }, { $set: { 'property': property, 'room': room } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'OK' });
                }
            });
        };
        this.dismissWorker = (req, res) => {
            let property = req.body.property; //moze da ih bude vise
            let room = req.body.room;
            worker_1.default.updateMany({ 'property': property, 'room': room }, { $set: { 'property': null, 'room': null } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'OK' });
                }
            });
        };
    }
}
exports.WorkerController = WorkerController;
//# sourceMappingURL=worker.controller.js.map