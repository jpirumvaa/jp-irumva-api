import mongoose from 'mongoose'
import Comments from '../models/comments'


export const getComments =(req, res, next)=>{
    Comments.find().select('_id comment commenter commentingTo').exec().then(docs=>{
        console.log(docs)
        res.status(200).json(docs)
    }).catch(err=>{
        console.log(err)
        res.status(500).json({error: err})
    })
}

export const addComment= (req, res, next)=>{
    const comment= new Comments({
        _id: new mongoose.Types.ObjectId(),
        comment: req.body.comment,
        commenter: req.body.commenter,
        commentingTo: req.body.commentingTo
    })
    comment.save().then(result=>{
        console.log(result)
        res.status(200).json({
            message: "Comment Posted Successfully",
            createdComent: comment
        })
    }).catch(err=>{
        console.log(err)
        res.status(500).json({error:err})
    })
}