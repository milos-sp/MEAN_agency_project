import express from 'express';
import CommentModel from '../models/comment';

export class CommentController{

    getCommentsForAgency(req: express.Request, res: express.Response){
        CommentModel.find({'agency_username': req.body.agency}, (err, comments)=>{
            if(err) console.log(err)
            else res.json(comments)
        })
    }

}