import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const CreateBlogForm = ({ user, blogFormRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const handleNewBlog = (event) => {
    event.preventDefault()
    dispatch(createBlog(title, author, url, user, blogFormRef))
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          title:
          <input
            type='text'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            placeholder='write the title'
          ></input>
        </div>
        <div>
          author:
          <input
            type='text'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            placeholder='write the author'
          ></input>
        </div>
        <div>
          url:
          <input
            type='text'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            placeholder='write the url'
          ></input>
        </div>
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}

export default CreateBlogForm
