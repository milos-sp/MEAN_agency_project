import express from 'express';
import RequestModel from '../models/request';

export class RequestController{
    
    addRequest = (req: express.Request, res: express.Response)=>{
        let request = req.body.request;
        RequestModel.insertMany(request)
        res.json({'message': 'Poslat je zahtev za saradnju'})
    }

    getRequestsA = (req: express.Request, res: express.Response)=>{
        let agency_username = req.body.agency_username;
        RequestModel.find({'agency_username': agency_username}, (err, requests)=>{
            if(err) console.log(err)
            else res.json(requests)
        })
    }

    reject = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;
        RequestModel.updateOne({'_id': id}, {$set: {'status': 2}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'Request rejected'})
        })
    }

    sendOffer = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;
        let offer = req.body.offer;
        RequestModel.updateOne({'_id': id}, {$set: {'offer': offer, 'status': 1}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'OK'})
        })
    }
}