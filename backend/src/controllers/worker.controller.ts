import express from 'express';
import WorkerModel from '../models/worker';

export class WorkerController{
    getWorkersForAgency = (req: express.Request, res: express.Response)=>{
        let agency = req.body.agency;
        WorkerModel.find({'agency': agency}, (err, workers)=>{
            if(err) console.log(err)
            else res.json(workers)
        })
    }

    getAvailableWorkersForAgency = (req: express.Request, res: express.Response)=>{
        let agency = req.body.agency;
        WorkerModel.find({'agency': agency, 'property': null, 'room': null}, (err, workers)=>{
            if(err) console.log(err)
            else res.json(workers)
        })
    }

    hireWorker = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;
        let property = req.body.property;
        let room = req.body.room;
        WorkerModel.findOneAndUpdate({'_id': id}, {$set: {'property': property, 'room': room}}, (err, resp)=>{
            if(err) console.log(err)
            else{
                res.json({'message': 'OK'})
            }
        })
    }
}