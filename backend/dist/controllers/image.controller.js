"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageController = void 0;
const image_1 = __importDefault(require("../models/image"));
const fs_1 = __importDefault(require("fs"));
class ImageController {
    constructor() {
        this.getImages = (req, res) => {
            image_1.default.find({}, (err, images) => {
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
        this.deleteImage = (req, res) => {
            image_1.default.findOne({ 'username': req.body.username }, (err, image) => {
                if (err)
                    console.log(err);
                else {
                    if (image.imageUrl.slice(30) != "avatar_default.png") {
                        let path = 'src//' + image.imageUrl.slice(22);
                        console.log(path);
                        console.log(image.imageUrl.slice(30));
                        fs_1.default.unlink(path, (err) => {
                            if (err) {
                                console.log(err);
                                return;
                            }
                        });
                    }
                }
            });
            image_1.default.deleteOne({ 'username': req.body.username }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'Deleted' });
            });
        };
    }
}
exports.ImageController = ImageController;
//# sourceMappingURL=image.controller.js.map