import { useState } from 'react'
import Notification from './Notification'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/loginReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleCredentials = (event) => {
    event.preventDefault()
    dispatch(loginUser({ username, password }))
    setUsername('')
    setPassword('')
  }

  return (
    <div className='flex flex-col items-center'>
      <h2 className='text-2xl m-5'>Log in to application</h2>
      <Notification />
      <form className='flex flex-col' onSubmit={handleCredentials}>
        <div className='flex justify-between'>
          <p className='self-center font-mono'>Username:</p>
          <input
            className='p-1 m-1 border border-gray-400 shadow-inner focus:outline-none focus:border-blue-500 focus:ring-1 rounded'
            type='text'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          ></input>
        </div>
        <div className='flex justify-between'>
          <p className='self-center font-mono'>Password:</p>
          <input
            className='p-1 m-1 border border-gray-400 shadow-inner focus:outline-none focus:border-blue-500 focus:ring-1 rounded'
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          ></input>
        </div>
        <button className='place-self-center py-1 px-3 m-2 bg-sky-500 text-white text-lg shadow-md hover:bg-sky-700 rounded duration-150' type='submit'>Login</button>
      </form>
    </div>
  )
}

export default LoginForm
