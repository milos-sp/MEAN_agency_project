"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentController = void 0;
const comment_1 = __importDefault(require("../models/comment"));
class CommentController {
    getCommentsForAgency(req, res) {
        comment_1.default.find({ 'agency_username': req.body.agency }, (err, comments) => {
            if (err)
                console.log(err);
            else
                res.json(comments);
        });
    }
}
exports.CommentController = CommentController;
//# sourceMappingURL=comment.controller.js.map