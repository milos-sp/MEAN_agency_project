import express from 'express';
import RequestModel from '../models/request';

export class RequestController{
    
    addRequest = (req: express.Request, res: express.Response)=>{
        let request = req.body.request;
        RequestModel.insertMany(request)
        res.json({'message': 'Poslat je zahtev za saradnju'})
    }

}