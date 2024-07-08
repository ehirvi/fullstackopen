import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import CreateBlogForm from './CreateBlogForm'
import Notification from './Notification'
import Togglable from './Togglable'
import { useRef } from 'react'
import { logoutUser } from '../reducers/loginReducer'
import Users from './Users'
import User from './User'
import Blog from './Blog'

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const sortedBlogs = () => blogs.toSorted((a, b) => b.likes - a.likes)

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
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
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <Togglable buttonLabel='New blog' ref={blogFormRef}>
                  <CreateBlogForm loggedUser={user} blogFormRef={blogFormRef} />
                </Togglable>
                <br />
                {sortedBlogs().map((blog) => (
                  <div key={blog.id} style={blogStyle}>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </div>
                ))}
              </>
            }
          />
          <Route path='/blogs/:blogId' element={<Blog />} />
          <Route path='/users' element={<Users />} />
          <Route path='/users/:userId' element={<User />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Blogs
