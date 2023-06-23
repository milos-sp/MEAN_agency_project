"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestController = void 0;
const request_1 = __importDefault(require("../models/request"));
class RequestController {
    constructor() {
        this.addRequest = (req, res) => {
            let request = req.body.request;
            request_1.default.insertMany(request);
            res.json({ 'message': 'Poslat je zahtev za saradnju' });
        };
        this.getRequestsA = (req, res) => {
            let agency_username = req.body.agency_username;
            request_1.default.find({ 'agency_username': agency_username }, (err, requests) => {
                if (err)
                    console.log(err);
                else
                    res.json(requests);
            });
        };
        this.reject = (req, res) => {
            let id = req.body.id;
            request_1.default.updateOne({ '_id': id }, { $set: { 'status': 2 } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'Request rejected' });
            });
        };
        this.sendOffer = (req, res) => {
            let id = req.body.id;
            let offer = req.body.offer;
            request_1.default.updateOne({ '_id': id }, { $set: { 'offer': offer, 'status': 1 } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'OK' });
            });
        };
    }
}
exports.RequestController = RequestController;
//# sourceMappingURL=request.controller.js.map