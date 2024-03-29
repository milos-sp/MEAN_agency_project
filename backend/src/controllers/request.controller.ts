import express from 'express';
import RequestModel from '../models/request';
import CancelJobModel from '../models/cancel_job';

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

    getRequestsC = (req: express.Request, res: express.Response)=>{
        let client_username = req.body.client_username;
        RequestModel.find({'client_username': client_username}, (err, requests)=>{
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

    rejectOffer = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;
        RequestModel.deleteOne({'_id': id}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'OK'})
        })
    }

    acceptOffer = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;
        RequestModel.updateOne({'_id': id}, {$set: {'active': true}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'OK'})
        })
    }

    startJob = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;
        let room = req.body.room;

        RequestModel.findOne({'_id': id}, (err, request)=>{
            if(err) console.log(err)
            else{
                let rooms_colors = request.rooms_colors
                rooms_colors[room] = 'red'
                RequestModel.updateOne({'_id': id}, {$set: {'rooms_colors': rooms_colors}}, (err, resp)=>{
                    if(err) console.log(err)
                    else res.json({'message': 'OK'})
                })
            }
        })
    }

    endJob = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;
        let room = req.body.room;

        RequestModel.findOne({'_id': id}, (err, request)=>{
            if(err) console.log(err)
            else{
                let rooms_colors = request.rooms_colors
                rooms_colors[room] = 'green'
                RequestModel.updateOne({'_id': id}, {$set: {'rooms_colors': rooms_colors}}, (err, resp)=>{
                    if(err) console.log(err)
                    else res.json({'message': 'OK'})
                })
            }
        })
    }
    
    pay = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;

        RequestModel.updateOne({'_id': id}, {$set: {'active': false, 'status': 3}}, (err, resp)=>{
            if(err) console.log(err)
                    else res.json({'message': 'OK'})
        })
    }

    getAllJobs = (req: express.Request, res: express.Response)=>{
        RequestModel.find({$or: [{'active': true}, {'status': 3}]}, (err, jobs)=>{
            if(err) console.log(err)
            else res.json(jobs)
        })
    }

    deleteRequests = (req: express.Request, res: express.Response)=>{
        let property_id = req.body.property_id;
        
        RequestModel.deleteMany({'property_id': property_id}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'OK'})
        })
    }

    stopJob = (req: express.Request, res: express.Response)=>{
        let stopRequest = req.body

        CancelJobModel.insertMany(stopRequest)
        res.json({'message': 'Dodat zahtev za otkazivanje'})
    }

    getCancelRequests = (req: express.Request, res: express.Response)=>{
        CancelJobModel.find({}, (err, requests)=>{
            if(err) console.log(err)
            else res.json(requests)
        })
    }

    rejectStopRequest = (req: express.Request, res: express.Response)=>{
        CancelJobModel.deleteOne({'_id': req.query.id}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'Odbijen'})
        })
    }

    deleteJob = (req: express.Request, res: express.Response)=>{
        CancelJobModel.deleteOne({'_id': req.query.id}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'Otkazan posao'})
        })
    }
}