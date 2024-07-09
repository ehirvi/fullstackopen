import { useSelector } from 'react-redux'
import { Link, Route, Routes } from 'react-router-dom'
import CreateBlogForm from './CreateBlogForm'
import Notification from './Notification'
import Togglable from './Togglable'
import { useRef } from 'react'
import Users from './Users'
import User from './User'
import Blog from './Blog'
import Navigation from './Navigation'

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)
  const blogFormRef = useRef()

  const sortedBlogs = () => blogs.toSorted((a, b) => b.likes - a.likes)

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
      <Navigation />
      <h2 className='font-mono'>Blog app</h2>
      <Notification />
      <br />
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Togglable buttonLabel='New blog' ref={blogFormRef}>
                <CreateBlogForm blogFormRef={blogFormRef} />
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
    </>
  )
}

export default Blogs
