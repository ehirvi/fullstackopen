import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { useNavigate, useParams } from 'react-router-dom'
import CommentForm from './CommentForm'

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
    <div className='flex flex-col self-center items-center' data-testid='blog'>
      <div className='flex flex-col'>
        <h2 className='text-lg'>
          {blog.title} {blog.author}
        </h2>
        <a className='underline hover:text-yellow-500' href={blog.url}>
          {blog.url}
        </a>
        <div className='flex items-center'>
          <p>{blog.likes} likes</p>
          <button
            className='py-1 px-3 m-2 bg-sky-500 text-white text-sm shadow-md hover:bg-sky-700 rounded duration-150'
            onClick={handleLike}
          >
            Like
          </button>
        </div>
        <div>added by {blog.user.name}</div>
        {isUserCreator() && (
          <div>
            <button
              className='py-1 px-3 my-2 bg-red-500 text-white text-sm shadow-md hover:bg-red-700 rounded duration-150'
              onClick={handleDelete}
            >
              Remove
            </button>
          </div>
        )}
      </div>
      <CommentForm blog={blog} />
    </div>
  )
}

export default Blog
