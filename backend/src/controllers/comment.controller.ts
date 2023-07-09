import express from 'express';
import CommentModel from '../models/comment';
import comment from '../models/comment';

export class CommentController{

    getCommentsForAgency = (req: express.Request, res: express.Response)=>{
        CommentModel.find({'agency_username': req.body.agency}, (err, comments)=>{
            if(err) console.log(err)
            else res.json(comments)
        })
    }

    getComment = (req: express.Request, res: express.Response)=>{
        CommentModel.findOne({'agency_username': req.body.agency, 'username': req.body.user}, (err, comment)=>{
            if(err) console.log(err)
            else res.json(comment)
        })
    }

    addComment = (req: express.Request, res: express.Response)=>{
        let comment = new CommentModel(req.body)
        comment.save((err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'Dodat komentar!'})
        })
    }

    editComment = (req: express.Request, res: express.Response)=>{
        CommentModel.replaceOne({'username': req.body.username}, new CommentModel(req.body), (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'OK'})
        })
    }

}