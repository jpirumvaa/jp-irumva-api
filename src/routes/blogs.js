import express from 'express'
import {getBlogs, getBlogById, deleteBlog, editBlog, addBlog} from '../controllers/blogs'
import {checkAuth} from '../middleware/checkAuth'
import {blogsValidation} from '../validators/blogsValidator'

const blogsRoutes = express.Router()


blogsRoutes.get('/', getBlogs)

blogsRoutes.post('/', blogsValidation, checkAuth, addBlog)

blogsRoutes.get('/:blogId', getBlogById)

blogsRoutes.put('/:blogId', editBlog)

blogsRoutes.delete('/:blogId', checkAuth, deleteBlog)


export default blogsRoutes