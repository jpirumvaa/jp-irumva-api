import mongoose from 'mongoose'
import validate from 'mongoose-validator'


/*
const usernameValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 50],
        message: 'Username should be between 3 and 50 characters'
    }),
    validate({
        validator: 'isAlphanumeric',
        passIfEmpty: true,
        message: 'Username should contain alpha-numeric characters only'
    })
];

const passwordValidator= validate({
        validator: 'isLength',
        arguments: [6, 100],
        message:"Password should be between 6 and 100 characters"
    })

*/

const usersSchema= mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true,
        //validate: usernameValidator
    },
    password: {
        type: String,
        required: true,
        //validate: usernameValidator
       // match: '/^.{6,100}$/'
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    }

}, {timestamps: true})

export default mongoose.model("Users", usersSchema)