import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../reducers/loginReducer'

const Navigation = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  
  const navBarStyle = {
    backgroundColor: 'lightGrey',
  }
  const navItemStyle = {
    margin: 5,
  }

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <div style={navBarStyle}>
      <Link style={navItemStyle} to='/'>
        Blogs
      </Link>
      <Link style={navItemStyle} to='/users'>
        Users
      </Link>
      {user.name} logged in
      <button onClick={handleLogout} style={navItemStyle}>
        Logout
      </button>
    </div>
  )
}

export default Navigation
