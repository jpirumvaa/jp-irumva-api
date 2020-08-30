import express from 'express'
import {logUserIn, deleteUser, createUser, getUsers, getUserById} from '../controllers/users'


const usersRoutes = express.Router()

usersRoutes.post('/signup', createUser)
usersRoutes.get('/profile', getUsers)
usersRoutes.get('profile/:userId', getUserById)
usersRoutes.post('/login', logUserIn)
usersRoutes.delete('profile/:userId', deleteUser)


export default usersRoutes