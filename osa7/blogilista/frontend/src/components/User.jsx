import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const { userId } = useParams()
  const user = useSelector((state) =>
    state.users.find((user) => user.id === userId),
  )

  if (!user) {
    return null
  }

  return (
    <div className='flex flex-col items-center'>
      <h2 className='text-xl font-bold'>{user.name}</h2>
      <h3 className='text-lg font-bold'>Added blogs</h3>
      <ul className='list-disc'>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
