import express from 'express'
import Messages from '../models/messages'
import mongoose from 'mongoose'


const messagesRoutes = express.Router()



messagesRoutes.get('/', (req, res, next)=>{
    Messages.find().select('_id message name email').exec().then(docs=>{
        console.log(docs)
        res.status(200).json(docs)
    }).catch(err=>{
        console.log(err)
        res.status(500).json({error: err})
    })
})

messagesRoutes.post('/', (req, res, next)=>{
    const message= new Messages({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        message: req.body.message,
        name: req.body.name,
    })
    message.save().then(result=>{
        console.log(result)
        res.status(200).json({
            message: "Message Posted Successfully",
            createdMessage: message
        })
    }).catch(err=>{
        console.log(err)
        res.status(500).json({error:err})
    })
})



export default messagesRoutes