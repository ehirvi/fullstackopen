import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogService'
import { showNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs: (state, action) => {
      return action.payload
    },
    concatBlog: (state, action) => {
      return state.concat(action.payload)
    },
    updateBlog: (state, action) => {
      const updatedBlog = action.payload
      return state.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog,
      )
    },
    removeBlog: (state, action) => {
      const deletedBlog = action.payload
      return state.filter((blog) => blog.id !== deletedBlog.id)
    },
  },
})

export const { setBlogs, concatBlog, updateBlog, removeBlog } =
  blogSlice.actions

export const getBlogs = () => {
  return async (dispatch) => {
    try {
      const data = await blogService.getAll()
      dispatch(setBlogs(data))
    } catch (error) {
      dispatch(
        showNotification({
          text: 'Could not connect to the server',
          status: 'error',
        }),
      )
    }
  }
}

export const createBlog = (title, author, url, user, blogFormRef) => {
  return async (dispatch) => {
    try {
      blogFormRef.current.toggleVisibility()
      const blog = {
        title,
        author,
        url,
      }
      const newBlog = await blogService.create(blog)
      const savedBlog = {
        ...newBlog,
        user: {
          id: newBlog.user,
          username: user.username,
          name: user.name,
        },
      }
      dispatch(concatBlog(savedBlog))
      dispatch(
        showNotification({
          text: `A new blog ${savedBlog.title} by ${savedBlog.author} was created`,
          status: 'success',
        }),
      )
    } catch (error) {
      dispatch(
        showNotification({
          text: 'Failed to create a new blog',
          status: 'error',
        }),
      )
    }
  }
}

export const likeBlog = (blog, likes) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.like(blog, likes)
      dispatch(updateBlog(updatedBlog))
    } catch (error) {
      dispatch(
        showNotification({
          text: 'Blog might have already been deleted',
          status: 'error',
        }),
      )
    }
  }
}

export const deleteBlog = (blogToDelete) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blogToDelete)
      dispatch(removeBlog(blogToDelete))
      dispatch(
        showNotification({
          text: `Blog ${blogToDelete.title} by ${blogToDelete.author} was succesfully removed`,
          status: 'success',
        }),
      )
    } catch (error) {
      dispatch(
        showNotification({
          text: 'Could not remove blog due to error',
          status: 'error',
        }),
      )
    }
  }
}

export default blogSlice.reducer
