"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Worker = new Schema({
    _id: {
        type: mongoose_1.default.Types.ObjectId
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    occupation: {
        type: String
    },
    agency: {
        type: String
    },
    property: {
        type: String
    },
    room: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('WorkerModel', Worker, 'workers');
//# sourceMappingURL=worker.js.map