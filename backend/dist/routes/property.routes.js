"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const property_controller_1 = require("../controllers/property.controller");
const propertyRouter = express_1.default.Router();
propertyRouter.route('/getPropertiesByUsername').post((req, res) => new property_controller_1.PropertyController().getPropertiesByUsername(req, res));
propertyRouter.route('/getAllProperties').get((req, res) => new property_controller_1.PropertyController().getAllProperties(req, res));
propertyRouter.route('/deleteProperty').post((req, res) => new property_controller_1.PropertyController().deleteProperty(req, res));
propertyRouter.route('/addProperty').post((req, res) => new property_controller_1.PropertyController().addProperty(req, res));
propertyRouter.route('/getPropertyById').post((req, res) => new property_controller_1.PropertyController().getPropertyById(req, res));
propertyRouter.route('/editProperty').post((req, res) => new property_controller_1.PropertyController().editProperty(req, res));
exports.default = propertyRouter;
//# sourceMappingURL=property.routes.js.map