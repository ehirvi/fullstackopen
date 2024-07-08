import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { useNavigate, useParams } from 'react-router-dom'

const Blog = () => {
  const { blogId } = useParams()
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === blogId),
  )
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (!blog) {
    return null
  }

  const handleLike = () => {
    const newLikes = blog.likes + 1
    dispatch(likeBlog(blog, newLikes))
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog))
      navigate('/')
    }
  }

  const isUserCreator = () => {
    return blog.user.username === user.username
  }

  return (
    <div data-testid='blog'>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes
        <button onClick={handleLike}>Like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {isUserCreator() && (
        <div>
          <button onClick={handleDelete}>Remove</button>
        </div>
      )}
    </div>
  )
}

export default Blog
