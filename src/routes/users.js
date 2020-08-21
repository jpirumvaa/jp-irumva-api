import express from 'express'
import {logUserIn, deleteUser, createUser} from '../controllers/users'


const usersRoutes = express.Router()

usersRoutes.post('/signup', createUser)

usersRoutes.post('/login', logUserIn)

usersRoutes.delete('/:userId', deleteUser)

export default usersRoutes