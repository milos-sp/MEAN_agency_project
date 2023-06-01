"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageController = void 0;
const image_1 = __importDefault(require("../models/image"));
class ImageController {
    constructor() {
        this.getImages = (req, res) => {
            image_1.default.find({}, (err, images) => {
                //let imageMap = new Map<String, String>();
                if (err)
                    console.log(err);
                else
                    res.json(images);
            });
        };
        this.getImageByUsername = (req, res) => {
            image_1.default.findOne({ 'username': req.body.username }, (err, image) => {
                if (err)
                    console.log(err);
                else
                    res.json(image);
            });
        };
    }
}
exports.ImageController = ImageController;
//# sourceMappingURL=image.controller.js.map