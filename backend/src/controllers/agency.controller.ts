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

        UserModel.find({'type': 'agencija', 'agency': {$regex: agency}, 'address_string': {$regex: address}}, (err, agencies)=>{
            if(err) console.log(err)
            else res.json(agencies)
        })
    }

    editAgency = (req: express.Request, res: express.Response)=>{
        let agency = req.body.agency;

        UserModel.replaceOne({'username': agency.username}, new UserModel(agency), (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'Izmenjena agencija'})
        })
    }
}