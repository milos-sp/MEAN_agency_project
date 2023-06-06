"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Property = new Schema({
    type: {
        type: String
    },
    address: {
        type: String
    },
    owner: {
        type: String
    },
    rooms: {
        type: Number
    },
    area: {
        type: Number
    },
    layout: {
        type: Array
    },
    doors: {
        type: Array
    },
    id: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('PropertyModel', Property, 'properties');
//# sourceMappingURL=property.js.map