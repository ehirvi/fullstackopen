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
    className:
      'p-2 m-2 min-w-full border-2 border-black rounded hover:ring-2 hover:ring-sky-500 duration-150',
  }

  return (
    <>
      <Navigation />
      <h2 className='flex justify-center my-5 text-2xl font-bold'>BLOG APP</h2>
      <Notification />
      <div className='flex flex-col'>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <Togglable buttonLabel='New blog' ref={blogFormRef}>
                  <CreateBlogForm blogFormRef={blogFormRef} />
                </Togglable>
                <br />
                <div className='flex flex-col self-center items-center w-fit'>
                  {sortedBlogs().map((blog) => (
                    <div key={blog.id} {...blogStyle}>
                      <Link to={`/blogs/${blog.id}`}>
                        <p>{blog.title}</p>
                      </Link>
                    </div>
                  ))}
                </div>
              </>
            }
          />
          <Route path='/blogs/:blogId' element={<Blog />} />
          <Route path='/users' element={<Users />} />
          <Route path='/users/:userId' element={<User />} />
        </Routes>
      </div>
    </>
  )
}

export default Blogs
