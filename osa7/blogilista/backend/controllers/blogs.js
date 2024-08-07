const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { tokenExtractor, userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (req, res) => {
  const allBlogs = await Blog.find({}).populate('user', { blogs: 0 })
  res.json(allBlogs)
})

blogsRouter.post('/', tokenExtractor, userExtractor, async (req, res, next) => {
  try {
    const body = req.body
    const user = req.user
    const newBlog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      comments: [],
      user: user._id,
    })
    const savedBlog = await newBlog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    const populatedBlog = await savedBlog.populate('user', { blogs: 0 })
    res.status(201).json(populatedBlog)
  } catch (err) {
    next(err)
  }
})

blogsRouter.delete(
  '/:id',
  tokenExtractor,
  userExtractor,
  async (req, res, next) => {
    try {
      const blogToDelete = await Blog.findById(req.params.id)
      if (blogToDelete === null) {
        return res.status(400).json({ error: 'blog not found' })
      }
      const user = req.user
      if (blogToDelete.user.toString() !== user._id.toString()) {
        return res.status(401).json({ error: 'token invalid' })
      }
      await Blog.findOneAndDelete(blogToDelete)
      user.blogs = user.blogs.filter(
        (blog) => blog._id.toString() !== blogToDelete._id.toString(),
      )
      await user.save()
      res.status(204).end()
    } catch (err) {
      next(err)
    }
  },
)

blogsRouter.put(
  '/:id',
  tokenExtractor,
  userExtractor,
  async (req, res, next) => {
    try {
      const editedBlog = {
        title: req.body.title,
        author: req.body.author,
        url: req.body.url,
        likes: req.body.likes,
        comments: req.body.comments,
        user: req.body.user,
      }
      const blogToEdit = await Blog.findById(req.params.id)
      if (blogToEdit === null) {
        return res.status(400).end()
      }
      // if (blogToEdit.user.toString() !== req.user._id.toString()) {
      //   return res.status(401).json({ error: 'token invalid' })
      // }
      const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        editedBlog,
        { new: true },
      )
      const populatedBlog = await updatedBlog.populate('user', { blogs: 0 })
      res.status(200).json(populatedBlog)
    } catch (err) {
      next(err)
    }
  },
)

blogsRouter.post('/:id/comments', async (req, res, next) => {
  try {
    const comment = req.body.comment
    const blog = await Blog.findById(req.params.id)
    blog.comments = blog.comments.concat(comment)
    const updatedBlog = await blog.save()
    const populatedBlog = await updatedBlog.populate('user', { blogs: 0 })
    res.status(201).json(populatedBlog)
  } catch (err) {
    next(err)
  }
})

module.exports = blogsRouter
