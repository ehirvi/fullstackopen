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
    <div className='bg-sky-400 flex justify-center'>
      <Link className='m-5 self-center hover:text-white active:text-black'  to='/'>
        Blogs
      </Link>
      <Link className='m-5 self-center hover:text-white active:text-black'  to='/users'>
        Users
      </Link>
      <p className='m-5 self-center font-bold'>{user.name} logged in</p>
      <button className='m-5 self-center px-2 py-1 rounded bg-red-500 text-white shadow-md hover:bg-red-700 active:bg-sky-500 duration-150' onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default Navigation
