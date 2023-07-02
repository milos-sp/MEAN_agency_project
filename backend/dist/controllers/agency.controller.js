"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgencyController = void 0;
const user_1 = __importDefault(require("../models/user"));
class AgencyController {
    constructor() {
        this.getAllAgencies = (req, res) => {
            user_1.default.find({ 'type': 'agencija' }, (err, agencies) => {
                if (err)
                    console.log(err);
                else
                    res.json(agencies);
            });
        };
        this.searchAgencies = (req, res) => {
            let agency = req.body.agency;
            let address = req.body.address;
            user_1.default.find({ 'type': 'agencija', 'agency': { $regex: agency }, 'address_string': { $regex: address } }, (err, agencies) => {
                if (err)
                    console.log(err);
                else
                    res.json(agencies);
            });
        };
        this.editAgency = (req, res) => {
            let agency = req.body.agency;
            user_1.default.replaceOne({ 'username': agency.username }, new user_1.default(agency), (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'Izmenjena agencija' });
            });
        };
    }
}
exports.AgencyController = AgencyController;
//# sourceMappingURL=agency.controller.js.map