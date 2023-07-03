import express from 'express';
import ImageModel from '../models/image';


export class ImageController{
    getImages = (req: express.Request, res: express.Response)=>{
        
        ImageModel.find({}, (err, images)=>{
            //let imageMap = new Map<String, String>();
            if(err) console.log(err)
            else res.json(images)
        })

    }

    getImageByUsername = (req: express.Request, res: express.Response)=>{
        ImageModel.findOne({'username': req.body.username}, (err, image)=>{
            if(err) console.log(err)
            else res.json(image)
        })
    }

    deleteImage = (req: express.Request, res: express.Response)=>{
        ImageModel.deleteOne({'username': req.body.username}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'Deleted'})
        })
    }
}