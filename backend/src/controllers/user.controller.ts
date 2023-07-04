import express from 'express';
import UserModel from '../models/user';
import PendingUserModel from '../models/pending_user';
import ImageModel from '../models/image';

const multer = require('multer');

export class UserController{
    login = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;

        UserModel.findOne({'username': username, 'password': password}, (err, user)=>{
            if(err) console.log(err)
            else res.json(user)
        })
    }

    register = (req: express.Request, res: express.Response)=>{
        let user = new PendingUserModel(req.body);
        user.rejected = false;

        user.save((err, resp)=>{
            if(err){
                console.log(err)
                res.status(400).json({'message': 'greska'})
            }else{
                res.json({'message': 'Uspešno poslat zahtev za registraciju!'})
            }
        })
    }

    getUsers = (req: express.Request, res: express.Response)=>{
        UserModel.find({}, (err, users)=>{
            if(err) console.log(err)
            else res.json(users)
        })
    }

    getUserByUsername = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        UserModel.findOne({'username': username}, (err, user)=>{
            if(err) console.log(err)
            else res.json(user)
        })
    }

    getAllClients = (req: express.Request, res: express.Response)=>{
        UserModel.find({'type': 'klijent'}, (err, clients)=>{
            if(err) console.log(err)
            else res.json(clients)
        })
    }

    uploadAvatarImage = (req: express.Request, res: express.Response, next: express.NextFunction)=>{
        if(req.file){
            let imageDB = new ImageModel({'username': req.params.username, 'imageUrl': 'http://127.0.0.1:4000/uploads/' + 
            Math.floor(new Date().getTime()/1000) + '-' + req.file.originalname})
            imageDB.save((err, resp)=>{
                if(err) console.log(err)
                else res.json({'message': 'Uspeo je upload'})
            })
        }else{
            res.status(500).json({'message': 'Nije uspeo upload'})
        }
    }

    addDefaultImage = (req: express.Request, res: express.Response)=>{
        let imageDB = new ImageModel(req.body)
        imageDB.save((err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'ok'})
        })
    }

    editClient = (req: express.Request, res: express.Response)=>{
        let client = req.body.client;

        UserModel.replaceOne({'username': client.username}, new UserModel(client), (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'Izmenjen klijent'})
        })
    }

    getPendingUsers = (req: express.Request, res: express.Response)=>{
        PendingUserModel.find({'rejected': false}, (err, users)=>{
            if(err) console.log(err)
            else res.json(users)
        })
    }

    accept = (req: express.Request, res: express.Response)=>{
        let user = new UserModel(req.body.user)
        user.save((err, resp)=>{
            if(err){
                console.log(err)
                res.status(400).json({'message': 'greska'})
            }else{
                res.json({'message': 'Prihvaćen zahtev za registraciju!'})
            }
        })
        PendingUserModel.updateOne({'username': user.username}, {$set: {'rejected': true}}, (err, resp)=>{
            if(err) console.log(err)
        })
    }

    reject = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;

        PendingUserModel.updateOne({'username': username}, {$set: {'rejected': true}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'Zahtev je odbijen'})
        })
    }

    deleteUser = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;

        UserModel.deleteOne({'username': username}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'Uspelo je brisanje!'})
        })
    }

    addUser = (req: express.Request, res: express.Response)=>{
        let user = new UserModel(req.body);

        user.save((err, resp)=>{
            if(err){
                console.log(err)
                res.status(400).json({'message': 'greska'})
            }else{
                res.json({'message': 'Uspešno poslat zahtev za registraciju!'})
            }
        })
    }

    acceptExpansionRequest = (req: express.Request, res: express.Response)=>{
        let agency = req.body.agency;
        let increment = req.body.increment;

        UserModel.findOneAndUpdate({'username': agency}, {$inc: {'workers_number': increment}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'Dodata nova mesta za radnike!'})
        })
    }
}