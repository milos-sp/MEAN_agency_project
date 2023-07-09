"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comment_controller_1 = require("../controllers/comment.controller");
const commentRouter = express_1.default.Router();
commentRouter.route('/getCommentsForAgency').post((req, res) => new comment_controller_1.CommentController().getCommentsForAgency(req, res));
commentRouter.route('/getComment').post((req, res) => new comment_controller_1.CommentController().getComment(req, res));
commentRouter.route('/addComment').post((req, res) => new comment_controller_1.CommentController().addComment(req, res));
commentRouter.route('/editComment').post((req, res) => new comment_controller_1.CommentController().editComment(req, res));
exports.default = commentRouter;
//# sourceMappingURL=comment.routes.js.map