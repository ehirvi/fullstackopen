import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleAddingLike, handleBlogDeletion, user }) => {
  const [visible, setVisible] = useState(false)
  const [blogInfo, setBlogInfo] = useState(blog)
  const [blogCreator, setblogCreator] = useState(blog.user)
  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = () => {
    let newLikes = blogInfo.likes + 1
    handleAddingLike(blog, newLikes)
    setBlogInfo({ ...blogInfo, likes: newLikes })
  }

  const handleDelete = () => {
    if (
      window.confirm(`Remove blog ${blogInfo.title} by ${blogInfo.author}?`)
    ) {
      handleBlogDeletion(blogInfo)
    }
  }

  const checkUser = () => {
    return blogCreator.username === user.username
  }

  const fullInfo = () => {
    return (
      <>
        <div>{blogInfo.url}</div>
        <div>
          Likes {blogInfo.likes}
          <button onClick={handleLike}>Like</button>
        </div>
        <div>{blogCreator.name}</div>
        {checkUser() && (
          <div>
            <button onClick={handleDelete}>Remove</button>
          </div>
        )}
      </>
    )
  }

  return (
    <div style={blogStyle} data-testid='blog'>
      {blogInfo.title} {blogInfo.author}
      <button onClick={toggleVisibility}>{visible ? 'Hide' : 'View'}</button>
      {visible && fullInfo()}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleAddingLike: PropTypes.func.isRequired,
  handleBlogDeletion: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog
