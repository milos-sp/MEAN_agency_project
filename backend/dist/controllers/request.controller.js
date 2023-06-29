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
        this.getRequestsC = (req, res) => {
            let client_username = req.body.client_username;
            request_1.default.find({ 'client_username': client_username }, (err, requests) => {
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
        this.rejectOffer = (req, res) => {
            let id = req.body.id;
            request_1.default.deleteOne({ '_id': id }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'OK' });
            });
        };
        this.acceptOffer = (req, res) => {
            let id = req.body.id;
            request_1.default.updateOne({ '_id': id }, { $set: { 'active': true } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'OK' });
            });
        };
        this.startJob = (req, res) => {
            let id = req.body.id;
            let room = req.body.room;
            request_1.default.findOne({ '_id': id }, (err, request) => {
                if (err)
                    console.log(err);
                else {
                    let rooms_colors = request.rooms_colors;
                    rooms_colors[room] = 'red';
                    request_1.default.updateOne({ '_id': id }, { $set: { 'rooms_colors': rooms_colors } }, (err, resp) => {
                        if (err)
                            console.log(err);
                        else
                            res.json({ 'message': 'OK' });
                    });
                }
            });
        };
        this.endJob = (req, res) => {
            let id = req.body.id;
            let room = req.body.room;
            request_1.default.findOne({ '_id': id }, (err, request) => {
                if (err)
                    console.log(err);
                else {
                    let rooms_colors = request.rooms_colors;
                    rooms_colors[room] = 'green';
                    request_1.default.updateOne({ '_id': id }, { $set: { 'rooms_colors': rooms_colors } }, (err, resp) => {
                        if (err)
                            console.log(err);
                        else
                            res.json({ 'message': 'OK' });
                    });
                }
            });
        };
        this.pay = (req, res) => {
            let id = req.body.id;
            request_1.default.updateOne({ '_id': id }, { $set: { 'active': false, 'status': 3 } }, (err, resp) => {
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