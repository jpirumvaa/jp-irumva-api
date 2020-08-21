import mongoose from 'mongoose'
const messagesSchema= mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    }
})

export default mongoose.model("Messages", messagesSchema)