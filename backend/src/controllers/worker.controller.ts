import express from 'express';
import WorkerModel from '../models/worker';
import WorkerRequestModel from '../models/worker_request';

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

    dismissWorker = (req: express.Request, res: express.Response)=>{
        let property = req.body.property; //moze da ih bude vise
        let room = req.body.room;
        WorkerModel.updateMany({'property': property, 'room': room}, {$set: {'property': null, 'room': null}}, (err, resp)=>{
            if(err) console.log(err)
            else{
                res.json({'message': 'OK'})
            }
        })
    }

    deleteWorker = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;
        WorkerModel.deleteOne({'_id': id}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'Radnik je izbrisan'})
        })
    }

    insertWorker = (req: express.Request, res: express.Response)=>{
        let worker = req.body.worker
        WorkerModel.insertMany(worker).then((resp=>{
            res.json({'message': 'Radnik je dodat!'})
        }))
    }

    getRequest = (req: express.Request, res: express.Response)=>{
        let agency = req.query.agency;
        WorkerRequestModel.findOne({'agency': agency}, (err, r)=>{
            if(err) console.log(err)
            else res.json(r)
        })
    }

    addRequest = (req: express.Request, res: express.Response)=>{
        let agency = req.body.agency;
        let increment = req.body.increment;

        WorkerRequestModel.insertMany({'agency': agency, 'increment': increment})
    }

    getWorker = (req: express.Request, res: express.Response)=>{
        let id = req.query.id;

        WorkerModel.findOne({'_id': id}, (err, worker)=>{
            if(err) console.log(err)
            else res.json(worker)
        })
    }

    editWorker = (req: express.Request, res: express.Response)=>{
        let worker = req.body.worker;
        
        WorkerModel.updateOne({'_id': worker._id}, {$set: {'firstname': worker.firstname, 'lastname': worker.lastname, 
        'phone': worker.phone, 'email': worker.email, 'occupation': worker.occupation}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'Radnik je ažuriran'})
        })
    }

}