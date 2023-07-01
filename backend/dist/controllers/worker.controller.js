"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkerController = void 0;
const worker_1 = __importDefault(require("../models/worker"));
const worker_request_1 = __importDefault(require("../models/worker_request"));
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
        this.deleteWorker = (req, res) => {
            let id = req.body.id;
            worker_1.default.deleteOne({ '_id': id }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'Radnik je izbrisan' });
            });
        };
        this.insertWorker = (req, res) => {
            let worker = req.body.worker;
            worker_1.default.insertMany(worker).then((resp => {
                res.json({ 'message': 'Radnik je dodat!' });
            }));
        };
        this.getRequest = (req, res) => {
            let agency = req.query.agency;
            worker_request_1.default.findOne({ 'agency': agency }, (err, r) => {
                if (err)
                    console.log(err);
                else
                    res.json(r);
            });
        };
        this.addRequest = (req, res) => {
            let agency = req.body.agency;
            let increment = req.body.increment;
            worker_request_1.default.insertMany({ 'agency': agency, 'increment': increment });
        };
    }
}
exports.WorkerController = WorkerController;
//# sourceMappingURL=worker.controller.js.map