import { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import loginService from './services/loginService'
import blogService from './services/blogService'
import './App.css'
import { useDispatch } from 'react-redux'
import { showNotification } from './reducers/notificationReducer'
import { getBlogs } from './reducers/blogReducer'

const App = () => {
  // const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  const blogFormRef = useRef()

  useEffect(() => {
    try {
      dispatch(getBlogs())
    } catch (err) {
      dispatch(
        showNotification({
          text: 'Could not connect to the server',
          status: 'error',
        }),
      )
    }
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
      // const updatedBlogList = blogs.filter((blog) => blog.id !== deletedBlog.id)
      // setBlogs(updatedBlogList)
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
          user={user}
          handleLogout={handleLogout}
          handleBlogDeletion={handleBlogDeletion}
          handleAddingLike={handleAddingLike}
          blogFormRef={blogFormRef}
        />
      )}
    </div>
  )
}

export default App
