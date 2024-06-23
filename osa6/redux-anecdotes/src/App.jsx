import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import anecdoteService from './services/anecdoteService'
import { setAnecdotes } from './reducers/anecdoteReducer'
import { useEffect } from 'react'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const getAllAnecdotes = async () => {
      const data = await anecdoteService.getAll()
      dispatch(setAnecdotes(data))
    }
    getAllAnecdotes()
  }, [])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App