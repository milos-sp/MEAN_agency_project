"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let WorkerRequest = new Schema({
    agency: {
        type: String
    },
    increment: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('WorkerRequestModel', WorkerRequest, 'worker_requests');
//# sourceMappingURL=worker_request.js.map