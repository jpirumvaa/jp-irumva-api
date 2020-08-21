import mongoose from 'mongoose'
const commentsSchema= mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    comment: {
        type: String,
        required: true,
    },
    commenter: {
        type: String,
        required: true,
    },
    commentingTo: {
        type: String,
        required: true,
    }
})

export default mongoose.model("Comments", commentsSchema)