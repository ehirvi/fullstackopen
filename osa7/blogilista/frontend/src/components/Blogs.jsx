import { useDispatch, useSelector } from 'react-redux'
import Blog from './Blog'
import CreateBlogForm from './CreateBlogForm'
import Notification from './Notification'
import Togglable from './Togglable'
import { useRef } from 'react'
import { logoutUser } from '../reducers/userReducer'

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const sortedBlogs = () => blogs.toSorted((a, b) => b.likes - a.likes)

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <>
      <h2>Blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>Logout</button>
      </div>
      <br />
      <Togglable buttonLabel='New blog' ref={blogFormRef}>
        <CreateBlogForm loggedUser={user} blogFormRef={blogFormRef} />
      </Togglable>
      <br />
      {sortedBlogs().map((blog) => (
        <Blog key={blog.id} blog={blog} loggedUser={user} />
      ))}
    </>
  )
}

export default Blogs
