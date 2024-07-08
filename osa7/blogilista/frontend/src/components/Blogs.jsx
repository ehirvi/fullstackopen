import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes, useMatch } from 'react-router-dom'
import Blog from './Blog'
import CreateBlogForm from './CreateBlogForm'
import Notification from './Notification'
import Togglable from './Togglable'
import { useRef } from 'react'
import { logoutUser } from '../reducers/loginReducer'
import Users from './Users'
import User from './User'

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
                  <Blog key={blog.id} blog={blog} loggedUser={user} />
                ))}
              </>
            }
          />
          <Route path='/users' element={<Users />} />
          <Route path='/users/:userId' element={<User />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Blogs
