import { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogs } from './reducers/blogReducer'
import { getUser } from './reducers/loginReducer'
import { getUsers } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(getUser())
    dispatch(getBlogs())
    dispatch(getUsers())
  }, [])

  return (
    <div className='font-mono'>
      {!user && <LoginForm />}
      {user && <Blogs />}
    </div>
  )
}

export default App
