import { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import loginService from './services/loginService'
import blogService from './services/blogService'
import './App.css'
import { useDispatch } from 'react-redux'
import {
  setNotification,
  showNotification,
} from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  const blogFormRef = useRef()

  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        const blogs = await blogService.getAll()
        setBlogs(blogs)
      } catch (err) {
        dispatch(
          showNotification({
            text: 'Could not connect to the server',
            status: 'error',
          }),
        )
      }
    }
    getAllBlogs()
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (err) {
      dispatch(
        showNotification({
          text: 'Wrong username or password',
          status: 'error',
        }),
      )
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const handleBlogCreation = async (blog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const newBlog = await blogService.create(blog)
      const savedBlog = {
        ...newBlog,
        user: {
          id: newBlog.user,
          username: user.username,
          name: user.name,
        },
      }
      setBlogs(blogs.concat(savedBlog))
      dispatch(
        showNotification({
          text: `A new blog ${savedBlog.title} by ${savedBlog.author} was created`,
          status: 'success',
        }),
      )
    } catch (err) {
      dispatch(
        showNotification({
          text: 'Failed to create a new blog',
          status: 'error',
        }),
      )
      // console.log(err)
    }
  }

  const handleAddingLike = async (blog, likes) => {
    try {
      const updatedBlog = await blogService.like(blog, likes)
    } catch (err) {
      dispatch(
        showNotification({
          text: 'Blog might have already been deleted',
          status: 'error',
        }),
      )
      // console.log(err)
    }
  }

  const handleBlogDeletion = async (deletedBlog) => {
    try {
      await blogService.remove(deletedBlog)
      const updatedBlogList = blogs.filter((blog) => blog.id !== deletedBlog.id)
      setBlogs(updatedBlogList)
      dispatch(
        showNotification({
          text: `Blog ${deletedBlog.title} by ${deletedBlog.author} was succesfully removed`,
          status: 'success',
        }),
      )
    } catch (err) {
      dispatch(
        showNotification({
          text: 'Could not remove blog due to error',
          status: 'error',
        }),
      )
      // console.log(err)
    }
  }

  return (
    <div>
      {!user && <LoginForm handleLogin={handleLogin} />}
      {user && (
        <Blogs
          blogs={blogs}
          user={user}
          handleLogout={handleLogout}
          handleBlogCreation={handleBlogCreation}
          handleBlogDeletion={handleBlogDeletion}
          handleAddingLike={handleAddingLike}
          blogFormRef={blogFormRef}
        />
      )}
    </div>
  )
}

export default App
