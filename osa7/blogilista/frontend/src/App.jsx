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
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBlogs())
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

  return (
    <div>
      {!user && <LoginForm handleLogin={handleLogin} />}
      {user && (
        <Blogs
          user={user}
          handleLogout={handleLogout}
        />
      )}
    </div>
  )
}

export default App
