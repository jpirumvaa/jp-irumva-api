import mongoose from 'mongoose'
const blogSchema= mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    author: String,
    body: String,
    date: String

})

export default mongoose.model("Blogs", blogSchema)