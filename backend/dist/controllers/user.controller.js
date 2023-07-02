"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
const pending_user_1 = __importDefault(require("../models/pending_user"));
const image_1 = __importDefault(require("../models/image"));
const multer = require('multer');
class UserController {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            user_1.default.findOne({ 'username': username, 'password': password }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.register = (req, res) => {
            let user = new pending_user_1.default(req.body);
            user.rejected = false;
            user.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ 'message': 'greska' });
                }
                else {
                    res.json({ 'message': 'Uspešno poslat zahtev za registraciju!' });
                }
            });
        };
        this.getUsers = (req, res) => {
            user_1.default.find({}, (err, users) => {
                if (err)
                    console.log(err);
                else
                    res.json(users);
            });
        };
        this.getUserByUsername = (req, res) => {
            let username = req.body.username;
            user_1.default.findOne({ 'username': username }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.getAllClients = (req, res) => {
            user_1.default.find({ 'type': 'klijent' }, (err, clients) => {
                if (err)
                    console.log(err);
                else
                    res.json(clients);
            });
        };
        this.uploadAvatarImage = (req, res, next) => {
            if (req.file) {
                /*console.log(req.file.originalname)
                console.log(req.file.filename)
                console.log(req.params.username)*/
                let imageDB = new image_1.default({ 'username': req.params.username, 'imageUrl': 'http://127.0.0.1:4000/uploads/' + req.file.originalname });
                imageDB.save((err, resp) => {
                    if (err)
                        console.log(err);
                    else
                        res.json({ 'message': 'Uspeo je upload' });
                });
            }
            else {
                res.status(500).json({ 'message': 'Nije uspeo upload' });
            }
        };
        this.addDefaultImage = (req, res) => {
            let imageDB = new image_1.default(req.body);
            imageDB.save((err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.editClient = (req, res) => {
            let client = req.body.client;
            user_1.default.replaceOne({ 'username': client.username }, new user_1.default(client), (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'Izmenjen klijent' });
            });
        };
        this.getPendingUsers = (req, res) => {
            pending_user_1.default.find({ 'rejected': false }, (err, users) => {
                if (err)
                    console.log(err);
                else
                    res.json(users);
            });
        };
        this.accept = (req, res) => {
            let user = new user_1.default(req.body.user);
            user.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ 'message': 'greska' });
                }
                else {
                    res.json({ 'message': 'Prihvaćen zahtev za registraciju!' });
                }
            });
            pending_user_1.default.updateOne({ 'username': user.username }, { $set: { 'rejected': true } }, (err, resp) => {
                if (err)
                    console.log(err);
            });
        };
        this.reject = (req, res) => {
            let username = req.body.username;
            pending_user_1.default.updateOne({ 'username': username }, { $set: { 'rejected': true } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'Zahtev je odbijen' });
            });
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map