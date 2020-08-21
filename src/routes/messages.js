import express from 'express'
import {addMessage, getMessages} from '../controllers/messages'



const messagesRoutes = express.Router()



messagesRoutes.get('/', getMessages)

messagesRoutes.post('/', addMessage)



export default messagesRoutes