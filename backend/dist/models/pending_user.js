"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
var bcrypt = require('bcrypt');
const Schema = mongoose_1.default.Schema;
let PendingUser = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    telephone: {
        type: String
    },
    email: {
        type: String
    },
    type: {
        type: String
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    agency: {
        type: String
    },
    agencyID: {
        type: Number
    },
    description: {
        type: String
    },
    address: {
        type: {
            country: {
                type: String
            },
            city: {
                type: String
            },
            street: {
                type: String
            },
            street_n: {
                type: String
            }
        }
    },
    address_string: {
        type: String
    },
    workers_number: {
        type: Number
    },
    rejected: {
        type: Boolean
    }
});
PendingUser.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};
PendingUser.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};
exports.default = mongoose_1.default.model('PendingUserModel', PendingUser, 'pending_users');
//# sourceMappingURL=pending_user.js.map