import express from 'express'
import {getBlogs, getBlogById, deleteBlog, editBlog, addBlog} from '../controllers/blogs'
import {checkAuth} from '../middleware/checkAuth'

const blogsRoutes = express.Router()


blogsRoutes.get('/', getBlogs)

blogsRoutes.post('/', checkAuth, addBlog)

blogsRoutes.get('/:blogId', getBlogById)

blogsRoutes.patch('/:blogId', checkAuth, editBlog)

blogsRoutes.delete('/:blogId', checkAuth, deleteBlog)


export default blogsRoutes