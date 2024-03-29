import express from 'express';
import PropertyModel from '../models/property';

export class PropertyController{
    getPropertiesByUsername = (req: express.Request, res: express.Response)=>{
        let owner = req.body.owner;
        PropertyModel.find({'owner': owner}, (err, properties)=>{
            if(err) console.log(err)
            else res.json(properties)
        })
    }

    getAllProperties = (req: express.Request, res: express.Response)=>{
        PropertyModel.find({}, (err, properties)=>{
            if(err) console.log(err)
            else res.json(properties)
        })
    }

    deleteProperty = (req: express.Request, res: express.Response)=>{
        PropertyModel.deleteOne({'_id': req.body.id}, (err, resp)=>{
            if(err) res.json({'message': 'Nije uspelo brisanje objekta'})
            else res.json({'message': 'Uspelo je brisanje objekta'})
        })
    }

    addProperty = (req: express.Request, res: express.Response)=>{
        let property = req.body.property;
        PropertyModel.insertMany(property)
        res.json({'message': 'Uspelo je dodavanje objekta'})
    }

    getPropertyById = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;
        PropertyModel.findOne({'_id': id}, (err, property)=>{
            if(err) console.log(err)
            else res.json(property)
        })
    }

    editProperty = (req: express.Request, res: express.Response)=>{
       let property = req.body;
       PropertyModel.replaceOne({'_id': property._id}, new PropertyModel(property), (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'Izmena uspela'})
       })
    }
}