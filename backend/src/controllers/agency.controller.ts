import express from 'express';
import UserModel from '../models/user';


export class AgencyController{
    getAllAgencies = (req: express.Request, res: express.Response)=>{
        UserModel.find({'type': 'agencija'}, (err, agencies)=>{
            if(err) console.log(err)
            else res.json(agencies)
        })
    }
}