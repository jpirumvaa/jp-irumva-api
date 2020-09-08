import express from 'express'
import morgan from 'morgan'
import bodyParser from "body-parser";
import mongoose from 'mongoose'
import blogsRoutes from './src/routes/blogs'
import messagesRoutes from './src/routes/messages'
import commentsRoutes  from './src/routes/comments'
import usersRoutes from './src/routes/users'
import cors from 'cors'


require("dotenv").config()


const app= express()
const mongoString= 'mongodb+srv://jpimanirumva:'+ process.env.MONGODB_PASSWORD +'@jpirumvabrand.fc5go.mongodb.net/jpblog?retryWrites=true&w=majority'
mongoose.connect(mongoString, 
{ useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("Connected")
}).catch(err=>{
    console.log(err)
})

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}) )
//app.use(bodyParser.json())
app.use(express.json({limit: '5mb'}))

// app.use((req, res, next)=>{
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization")
//     if(req.method==="OPTIONS"){
//         res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE")
//         return res.status(200).json({})
//     }
// next()
// })


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

const port= process.env.PORT || 5000
app.listen(port,()=>{
    console.log("I am running naaa", port)
})

export default app