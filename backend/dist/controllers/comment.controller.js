"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentController = void 0;
const comment_1 = __importDefault(require("../models/comment"));
class CommentController {
    constructor() {
        this.getCommentsForAgency = (req, res) => {
            comment_1.default.find({ 'agency_username': req.body.agency }, (err, comments) => {
                if (err)
                    console.log(err);
                else
                    res.json(comments);
            });
        };
        this.getComment = (req, res) => {
            comment_1.default.findOne({ 'agency_username': req.body.agency, 'username': req.body.user }, (err, comment) => {
                if (err)
                    console.log(err);
                else
                    res.json(comment);
            });
        };
        this.addComment = (req, res) => {
            let comment = new comment_1.default(req.body);
            comment.save((err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'Dodat komentar!' });
            });
        };
        this.editComment = (req, res) => {
            comment_1.default.replaceOne({ 'username': req.body.username }, new comment_1.default(req.body), (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'OK' });
            });
        };
    }
}
exports.CommentController = CommentController;
//# sourceMappingURL=comment.controller.js.map