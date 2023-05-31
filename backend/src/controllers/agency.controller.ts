import express from 'express';
import UserModel from '../models/user';


export class AgencyController{
    getAllAgencies = (req: express.Request, res: express.Response)=>{
        UserModel.find({'type': 'agencija'}, (err, agencies)=>{
            if(err) console.log(err)
            else res.json(agencies)
        })
    }

    searchAgencies = (req: express.Request, res: express.Response)=>{
        let agency = req.body.agency;
        let address = req.body.address;
        console.log(address)

        UserModel.find({'type': 'agencija', 'agency': {$regex: agency}, 'address_string': {$regex: address}}, (err, agencies)=>{
            if(err) console.log(err)
            else res.json(agencies)
        })
    }
}