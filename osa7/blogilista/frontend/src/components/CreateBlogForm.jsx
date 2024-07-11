import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const CreateBlogForm = ({ blogFormRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const handleNewBlog = (event) => {
    event.preventDefault()
    dispatch(createBlog(title, author, url, blogFormRef))
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div className='flex flex-col items-center'>
      <h2 className='text-xl'>Create new blog</h2>
      <form onSubmit={handleNewBlog} className='flex flex-col'>
        <div className='flex justify-between'>
          <p className='self-center'>Title:</p>
          <input
            className='p-1 m-1 border border-gray-400 shadow-inner focus:outline-none focus:border-blue-500 focus:ring-1 rounded'
            type='text'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            placeholder='write the title'
          ></input>
        </div>
        <div className='flex justify-between'>
          <p className='self-center'>Author:</p>
          <input
            className='p-1 m-1 border border-gray-400 shadow-inner focus:outline-none focus:border-blue-500 focus:ring-1 rounded'
            type='text'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            placeholder='write the author'
          ></input>
        </div>
        <div className='flex justify-between'>
          <p className='self-center'>Url:</p>
          <input
            className='p-1 m-1 border border-gray-400 shadow-inner focus:outline-none focus:border-blue-500 focus:ring-1 rounded'
            type='text'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            placeholder='write the url'
          ></input>
        </div>
        <button className='place-self-center py-1 px-3 m-2 bg-green-500 text-white text-lg shadow-md hover:bg-green-700 rounded duration-150' type='submit'>Create</button>
      </form>
    </div>
  )
}

export default CreateBlogForm
