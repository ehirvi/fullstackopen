import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector((state) => state.users)

  return (
    <div className='flex flex-col items-center'>
      <h2 className='text-xl'>Users</h2>
      <table className='border'>
        <thead className='border'>
          <tr>
            <th className='p-2 border'></th>
            <th className='p-2'>Blogs created</th>
          </tr>
        </thead>
        <tbody className='border'>
          {users.map((user) => (
            <tr className='border' key={user.id}>
              <td className='border'>
                <Link className='px-2 hover:bg-yellow-500 font-bold' to={user.id}>{user.name}</Link>
              </td>
              <td className='px-2'>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
