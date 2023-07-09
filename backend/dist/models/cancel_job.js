"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let CancelJob = new Schema({
    _id: {
        type: mongoose_1.default.Types.ObjectId
    },
    job_id: {
        type: String
    },
    client: {
        type: String
    },
    agency: {
        type: String
    },
    reason: {
        type: String
    }
});
exports.default = mongoose_1.default.model('CancelRequestModel', CancelJob, 'stop_job_requests');
//# sourceMappingURL=cancel_job.js.map