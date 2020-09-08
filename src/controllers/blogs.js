import Blog from '../models/blogs'
import mongoose from 'mongoose'

export const getBlogs= (req, res, next)=>{
    Blog.find().select('_id title author body date avatarURL dateofPublication').exec().then(docs=>{
        console.log(docs)
        const message= docs===null?"Not found": docs
        
        res.status(200).json({
            retrievedBlogs: message
        })
    }).catch(err=>{
        console.log(err)
        res.status(500).json({error: err})
    })
}

export const getBlogById= (req, res, next)=>{
    const id= req.params.blogId;
    Blog.findById(id).exec().then(doc=>{
        console.log("From DB", doc)
        res.status(200).json(doc)
    }).catch(err=>{
        console.log(err)
        res.status(500).json({error: err})
    })
}

export const addBlog=(req, res, next)=>{
    const blog= new Blog({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        author: req.body.author,
        body: req.body.body,
        date: req.body.date,
        avatarURL: req.body.avatarURL,
        dateofPublication: req.body.dateofPublication
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

}

export const deleteBlog= (req, res, next)=>{
    const id= req.params.blogId
Blog.remove({_id: id}).exec().then(results=>{
    console.log(results)
    res.status(200).json({
        "message": "Blog Deleted Successfully",
        "blog": results
    })
}).catch(err=>{
    console.log(err)
    res.status(500).json({error: err})
})
}
export const editBlog=  async (req, res, next)=>{
    const _id= req.params.blogId
    const selectedBlog= await Blog.findById({_id})
    selectedBlog.set({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title || selectedBlog.title,
        author: req.body.author || selectedBlog.author,
        body: req.body.body || selectedBlog.body,
        date: req.body.date || selectedBlog.date,
        avatarURL: req.body.avatarURL|| selectedBlog.avatarURL,      
        dateofPublication:req.body.dateofPublication || selectedBlog.dateofPublication,
    })
    const updatedBlog= await selectedBlog.save()

    return res.status(200).json({
        "message": "Updated Successfully",
        updatedBlog
     })
}