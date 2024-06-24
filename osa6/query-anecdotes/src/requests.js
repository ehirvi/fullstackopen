import axios from "axios"

const baseUrl = 'http://localhost:3001'

export const getAnecdotes = async () => {
  const res = await axios.get(`${baseUrl}/anecdotes`)
  return res.data
}