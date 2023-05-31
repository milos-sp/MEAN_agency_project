import express from 'express';
import ImageModel from '../models/image';


export class ImageController{
    getImages = (req: express.Request, res: express.Response)=>{
        
        ImageModel.find({}, (err, images)=>{
            let imageMap = new Map<String, String>();
            if(err) console.log(err)
            else res.json(images)
        })

    }
}