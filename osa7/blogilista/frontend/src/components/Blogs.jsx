import { useSelector } from 'react-redux'
import Blog from './Blog'
import CreateBlogForm from './CreateBlogForm'
import Notification from './Notification'
import Togglable from './Togglable'

const Blogs = ({
  user,
  handleLogout,
  handleBlogDeletion,
  handleAddingLike,
  blogFormRef,
}) => {
  const blogs = useSelector(state => state.blogs)
  const sortedBlogs = () => blogs.toSorted((a, b) => b.likes - a.likes)

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
        <CreateBlogForm user={user} blogFormRef={blogFormRef} />
      </Togglable>
      <br />
      {sortedBlogs().map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleAddingLike={handleAddingLike}
          handleBlogDeletion={handleBlogDeletion}
          user={user}
        />
      ))}
    </>
  )
}

export default Blogs
