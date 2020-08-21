import express from 'express'
import {getComments, addComment} from '../controllers/comments'


const commentsRoutes = express.Router()

commentsRoutes.get('/', getComments )

commentsRoutes.post('/', addComment)


export default commentsRoutes