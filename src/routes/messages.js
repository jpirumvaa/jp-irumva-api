import express from 'express'
const messagesRoutes = express.Router()

messagesRoutes.get('/', (req, res, next)=>{
    res.status(200).json({
        message: "Messages Retrieved Successfully"
    })
})

messagesRoutes.post('/', (req, res, next)=>{
    const message={
        email: req.body.email,
        message: req.body.message,
        name: req.body.name,
    }
    res.status(200).json({
        message: "Message was Added Successfully",
        createdMessage: message
    })
})


export default messagesRoutes