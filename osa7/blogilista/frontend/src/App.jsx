import { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import loginService from './services/loginService'
import blogService from './services/blogService'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        const blogs = await blogService.getAll()
        setBlogs(blogs)
      } catch (err) {
        showNotification('Could not connect to the server', 'error')
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
      showNotification('Wrong username or password', 'error')
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
      showNotification(
        `A new blog ${savedBlog.title} by ${savedBlog.author} was created`,
        'success',
      )
    } catch (err) {
      showNotification('Failed to create a new blog', 'error')
      // console.log(err)
    }
  }

  const handleAddingLike = async (blog, likes) => {
    try {
      const updatedBlog = await blogService.like(blog, likes)
    } catch (err) {
      showNotification('Blog might have already been deleted', 'error')
      // console.log(err)
    }
  }

  const handleBlogDeletion = async (deletedBlog) => {
    try {
      await blogService.remove(deletedBlog)
      const updatedBlogList = blogs.filter((blog) => blog.id !== deletedBlog.id)
      setBlogs(updatedBlogList)
      showNotification(
        `Blog ${deletedBlog.title} by ${deletedBlog.author} was succesfully removed`,
        'success',
      )
    } catch (err) {
      showNotification('Could not remove blog due to error', 'error')
      console.log(err)
    }
  }

  const showNotification = (text, status) => {
    setNotification({ text, status })
    setTimeout(() => setNotification(null), 5000)
  }

  return (
    <div>
      {!user && (
        <LoginForm
          handleLogin={handleLogin}
          showNotification={showNotification}
          notification={notification}
        />
      )}
      {user && (
        <Blogs
          blogs={blogs}
          user={user}
          handleLogout={handleLogout}
          handleBlogCreation={handleBlogCreation}
          handleBlogDeletion={handleBlogDeletion}
          handleAddingLike={handleAddingLike}
          showNotification={showNotification}
          notification={notification}
          blogFormRef={blogFormRef}
        />
      )}
    </div>
  )
}

export default App
