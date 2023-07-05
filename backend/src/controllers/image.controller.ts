import express from 'express';
import ImageModel from '../models/image';
import fs from 'fs';

export class ImageController{
    getImages = (req: express.Request, res: express.Response)=>{
        
        ImageModel.find({}, (err, images)=>{
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
        ImageModel.findOne({'username': req.body.username}, (err, image)=>{
            if(err) console.log(err)
            else{
                if(image.imageUrl.slice(30, )!="avatar_default.png"){
                    //ako nije ona default slika onda je briše
                    let path = 'src//' +  image.imageUrl.slice(22, )
                    fs.unlink(path, (err)=>{
                        if(err){
                            console.log(err)
                            return
                        }
                    })
                }
            }
        })
        ImageModel.deleteOne({'username': req.body.username}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'Deleted'})
        })
    }
}