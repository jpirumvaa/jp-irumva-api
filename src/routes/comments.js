import express from 'express'
import {getComments, addComment} from '../controllers/comments'
import {commentsValidation} from '../validators/commentsValidator'


const commentsRoutes = express.Router()

commentsRoutes.get('/', getComments )

commentsRoutes.post('/', commentsValidation, addComment)


export default commentsRoutes