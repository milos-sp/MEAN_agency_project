"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Request = new Schema({
    property_id: {
        type: String
    },
    date_start: {
        type: String
    },
    date_end: {
        type: String
    },
    agency_username: {
        type: String
    }
});
exports.default = mongoose_1.default.model('RequestModel', Request, 'requests');
//# sourceMappingURL=request.js.map