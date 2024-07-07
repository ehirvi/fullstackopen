import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const create = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const res = await axios.post(baseUrl, blog, config)
  return res.data
}

const like = async (blog, likes) => {
  const updatedBlog = {
    title: blog.title,
    url: blog.url,
    author: blog.author,
    likes: likes,
    user: blog.user.id,
  }
  const config = {
    headers: { Authorization: token },
  }
  const res = await axios.put(`${baseUrl}/${blog.id}`, updatedBlog, config)
  return res.data
}

const remove = async (blogToDelete) => {
  const config = {
    headers: { Authorization: token },
  }
  const res = await axios.delete(`${baseUrl}/${blogToDelete.id}`, config)
  return res
}

export default { getAll, create, setToken, like, remove }
