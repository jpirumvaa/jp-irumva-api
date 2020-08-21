import express from 'express'
const blogsRoutes = express.Router()
import Blog from '../models/blogs'
import mongoose from 'mongoose'

blogsRoutes.get('/', (req, res, next)=>{
Blog.find().select('_id title author body date').exec().then(docs=>{
    console.log(docs)
    res.status(200).json(docs)
}).catch(err=>{
    console.log(err)
    res.status(500).json({error: err})
})
})

blogsRoutes.post('/', (req, res, next)=>{
    const blog= new Blog({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        author: req.body.author,
        body: req.body.body,
        date: req.body.date
    })
    blog.save().then(result=>{
        console.log(result)
        res.status(200).json({
            message: "Blog Posted Successfully",
            createdBlog: blog
        })
    }).catch(err=>{
        console.log(err)
        res.status(500).json({error:err})
    })

})

blogsRoutes.get('/:blogId', (req, res, next)=>{
    const id= req.params.blogId;
    Blog.findById(id).exec().then(doc=>{
        console.log("From DB", doc)
        res.status(200).json(doc)
    }).catch(err=>{
        console.log(err)
        res.status(500).json({error: err})
    })
})

blogsRoutes.patch('/:blogId', (req, res, next)=>{
    const id= req.params.blogId
    const updateOps={}
    for(const ops of req.body){
        updateOps[ops.propName]= ops.value;
    }
    Blog.findOneAndUpdate({_id: id}, {updateOps}).exec().then(results=>{
        console.log(results)
        res.status(200).json(results)
    }).catch(err=>{
        console.log(err)
        res.status(500).json({error: err})
    })
})

blogsRoutes.delete('/:blogId', (req, res, next)=>{
    const id= req.params.blogId
Blog.remove({_id: id}).exec().then(results=>{
    console.log(results)
    res.status(200).json(results)
}).catch(err=>{
    console.log(err)
    res.status(500).json({error: err})
})
})


export default blogsRoutes