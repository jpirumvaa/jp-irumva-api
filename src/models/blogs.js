import mongoose from 'mongoose'
const blogSchema= mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    }

})

export default mongoose.model("Blogs", blogSchema)