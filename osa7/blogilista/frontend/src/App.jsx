import { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogs } from './reducers/blogReducer'
import { getUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(getBlogs())
  }, [user])

  useEffect(() => {
    dispatch(getUser())
  }, [])

  return (
    <div>
      {!user && <LoginForm />}
      {user && <Blogs />}
    </div>
  )
}

export default App
