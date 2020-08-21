import express from 'express'
import morgan from 'morgan'
import bodyParser from "body-parser";
import mongoose from 'mongoose'
import blogsRoutes from './src/routes/blogs'
import messagesRoutes from './src/routes/messages'
import commentsRoutes  from './src/routes/comments'
import usersRoutes from './src/routes/users'

const app= express()
mongoose.connect('mongodb+srv://jpirumva:'+ process.env.MONGODB_PASSWORD +'@jpirumvabrand.fc5go.mongodb.net/jpblog?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).catch(err=>{
    console.log(err)
})
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}) )
app.use(bodyParser.json())

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    if(req.method==="OPTIONS"){
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE")
        return res.status(200).json({})
    }
next()
})

app.use('/blogs', blogsRoutes)
app.use('/messages', messagesRoutes)
app.use('/comments', commentsRoutes)
app.use('/users', usersRoutes)

app.use((req,res,next)=>{
    const error = new Error("Not Found")
    error.status=404
    next(error)
})


app.use((error, req, res, next)=>{
    res.status(error.status||500);
    res.json({
        error:{
            message: error.message
        }
    })
})

export default app