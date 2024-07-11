import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { commentBlog } from '../reducers/blogReducer'

const CommentForm = ({ blog }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const handleComment = (event) => {
    event.preventDefault()
    dispatch(commentBlog(blog, comment))
    setComment('')
  }

  return (
    <div className='flex flex-col items-center'>
      <h3 className='text-xl'>Comments</h3>
      <form onSubmit={handleComment}>
        <input
          className='p-1 m-1 border border-gray-400 shadow-inner focus:outline-none focus:border-blue-500 focus:ring-1 rounded'
          type='text'
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        ></input>
        <button
          className='py-1 px-3 m-2 bg-green-500 text-white text-lg shadow-md hover:bg-green-700 rounded duration-150'
          type='submit'
        >
          Add comment
        </button>
      </form>
      <ul>
        {blog.comments.map((comment, index) => (
          <li className='list-disc list-inside' key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default CommentForm
