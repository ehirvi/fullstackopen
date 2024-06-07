import Blog from './Blog'
import CreateBlogForm from './CreateBlogForm'
import Notification from './Notification'
import Togglable from './Togglable'

const Blogs = ({
  blogs,
  user,
  handleLogout,
  handleBlogCreation,
  handleBlogDeletion,
  handleAddingLike,
  notification,
  blogFormRef }) => {


  const sortedBlogs = () => (
    blogs.sort((a, b) => b.likes - a.likes)
  )

  return (
    <>
      <h2>Blogs</h2>
      <Notification notification={notification} />
      <div>{user.name} logged in
        <button onClick={handleLogout}>Logout</button>
      </div>
      <br />
      <Togglable buttonLabel='New blog' ref={blogFormRef}>
        <CreateBlogForm handleBlogCreation={handleBlogCreation} />
      </Togglable>
      <br />
      {sortedBlogs().map(blog =>
        <Blog key={blog.id} blog={blog} handleAddingLike={handleAddingLike} handleBlogDeletion={handleBlogDeletion} user={user} />
      )}
    </>
  )
}

export default Blogs