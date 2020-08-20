import express from 'express'
const commentsRoutes = express.Router()

commentsRoutes.get('/', (req, res, next)=>{
    res.status(200).json({
        message: "Comments Retrieved Successfully"
    })
})

commentsRoutes.post('/', (req, res, next)=>{
    const comment={
        comment: req.body.comment,
        commenter: req.body.commenter,
        commentingTo: req.body.commentingTo
    }
    res.status(200).json({
        id: req.params.commentId,
        message: "Comment was Added Successfully",
        comment: comment
    })
})


export default commentsRoutes