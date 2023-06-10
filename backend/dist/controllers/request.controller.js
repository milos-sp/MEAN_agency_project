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
    }
}
exports.RequestController = RequestController;
//# sourceMappingURL=request.controller.js.map