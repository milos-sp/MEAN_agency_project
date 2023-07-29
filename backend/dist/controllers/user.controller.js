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
"use strict";
const nodemailer = require("nodemailer");
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
                let imageDB = new image_1.default({ 'username': req.params.username, 'imageUrl': 'http://127.0.0.1:4000/uploads/' +
                        Math.floor(new Date().getTime() / 1000) + '-' + req.file.originalname });
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
        this.deleteUser = (req, res) => {
            let username = req.body.username;
            user_1.default.deleteOne({ 'username': username }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'Uspelo je brisanje!' });
            });
        };
        this.addUser = (req, res) => {
            let user = new user_1.default(req.body);
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
        this.acceptExpansionRequest = (req, res) => {
            let agency = req.body.agency;
            let increment = req.body.increment;
            user_1.default.findOneAndUpdate({ 'username': agency }, { $inc: { 'workers_number': increment } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'Dodata nova mesta za radnike!' });
            });
        };
        this.changePassword = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            user_1.default.updateOne({ 'username': username }, { $set: { 'password': password } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'Lozinka je promenjena' });
            });
        };
        this.changePasswordEmail = (req, res) => {
            let email = req.body.email;
            let password = req.body.password;
            user_1.default.updateOne({ 'email': email }, { $set: { 'password': password } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'Lozinka je promenjena' });
            });
        };
        this.reset = (req, res) => {
            user_1.default.findOne({ 'email': req.body.email }, (err, user) => {
                if (err)
                    console.log(err);
                else {
                    if (user) {
                        const hash = new user_1.default(user).generatePasswordResetHash();
                        const resetLink = `http://localhost:4000/resetLink?email=${user.email}?&hash=${hash}`;
                        res.status(200).json({
                            resetLink
                        });
                        //poslati link
                        var transporter = nodemailer.createTransport({
                            host: 'smtp.ethereal.email',
                            port: 587,
                            auth: {
                                user: 'monty.wilkinson89@ethereal.email',
                                pass: 'cZrkznAAC1n6rCsxe5'
                            },
                            tls: {
                                rejectUnauthorized: false
                            }
                        });
                        var mailOptions = {
                            from: '"Monty Wilkinson" <monty.wilkinson89@ethereal.email>',
                            to: req.body.email,
                            subject: "Reset lozinke",
                            text: resetLink
                        };
                        transporter.sendMail(mailOptions, function (err, info) {
                            if (err)
                                console.log(err);
                            else
                                console.log('Poslat email: ' + info.response);
                        });
                    }
                    else {
                        return res.status(400).json({
                            'message': 'Neispravan email'
                        });
                    }
                }
            });
        };
        this.resetLink = (req, res) => {
            if (req.query && req.query.email && req.query.hash) {
                user_1.default.findOne({ 'email': req.query.email }, (err, user) => {
                    if (err)
                        console.log(err);
                    else {
                        if (user) {
                            if (new user_1.default(user).verifyPasswordResetHash(req.query.hash)) {
                                return res.sendFile('localhost:4200/new-password/' + req.query.email);
                            }
                            else {
                                return res.status(400).json({
                                    'message': 'Los link za reset lozinke'
                                });
                            }
                        }
                        else {
                            return res.status(400).json({
                                'message': 'Los link za reset lozinke'
                            });
                        }
                    }
                });
            }
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map