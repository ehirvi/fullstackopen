import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../reducers/loginReducer'

const Navigation = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <div className='bg-indigo-300 flex flex justify-center'>
      <Link className='m-5 font-sans hover:text-white active:text-black'  to='/'>
        Blogs
      </Link>
      <Link className='m-5 font-sans hover:text-white active:text-black'  to='/users'>
        Users
      </Link>
      <p className='m-5 font-sans font-bold'>{user.name} logged in</p>
      <button className='m-5 px-2 rounded font-sans bg-red-500 text-white hover:bg-white hover:text-black active:bg-indigo-300' onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default Navigation
