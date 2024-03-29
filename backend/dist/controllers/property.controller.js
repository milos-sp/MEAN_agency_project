"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyController = void 0;
const property_1 = __importDefault(require("../models/property"));
class PropertyController {
    constructor() {
        this.getPropertiesByUsername = (req, res) => {
            let owner = req.body.owner;
            property_1.default.find({ 'owner': owner }, (err, properties) => {
                if (err)
                    console.log(err);
                else
                    res.json(properties);
            });
        };
        this.getAllProperties = (req, res) => {
            property_1.default.find({}, (err, properties) => {
                if (err)
                    console.log(err);
                else
                    res.json(properties);
            });
        };
        this.deleteProperty = (req, res) => {
            property_1.default.deleteOne({ '_id': req.body.id }, (err, resp) => {
                if (err)
                    res.json({ 'message': 'Nije uspelo brisanje objekta' });
                else
                    res.json({ 'message': 'Uspelo je brisanje objekta' });
            });
        };
        this.addProperty = (req, res) => {
            let property = req.body.property;
            property_1.default.insertMany(property);
            res.json({ 'message': 'Uspelo je dodavanje objekta' });
        };
        this.getPropertyById = (req, res) => {
            let id = req.body.id;
            property_1.default.findOne({ '_id': id }, (err, property) => {
                if (err)
                    console.log(err);
                else
                    res.json(property);
            });
        };
        this.editProperty = (req, res) => {
            let property = req.body;
            property_1.default.replaceOne({ '_id': property._id }, new property_1.default(property), (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'Izmena uspela' });
            });
        };
    }
}
exports.PropertyController = PropertyController;
//# sourceMappingURL=property.controller.js.map