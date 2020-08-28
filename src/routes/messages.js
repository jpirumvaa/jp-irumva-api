import express from 'express'
import {addMessage, getMessages} from '../controllers/messages'
import {messagesValidation} from '../validators/messagesValidator'



const messagesRoutes = express.Router()



messagesRoutes.get('/', getMessages)

messagesRoutes.post('/', messagesValidation, addMessage)



export default messagesRoutes