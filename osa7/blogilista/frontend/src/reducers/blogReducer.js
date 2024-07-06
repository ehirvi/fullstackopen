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
  },
})

export const { setBlogs, concatBlog } = blogSlice.actions

export const getBlogs = () => {
  return async (dispatch) => {
    const data = await blogService.getAll()
    dispatch(setBlogs(data))
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

export default blogSlice.reducer
