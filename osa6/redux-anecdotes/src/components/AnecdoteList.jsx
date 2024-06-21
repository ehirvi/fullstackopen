import { useDispatch, useSelector } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"
import { clearNotification, createNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => (
    state.anecdotes.filter(anecdote =>
      anecdote.content.toLowerCase()
        .includes(state.filter.toLowerCase()))))

  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(addVote(anecdote.id))
    dispatch(createNotification(`You voted \'${anecdote.content}\'`))
    setTimeout(() => dispatch(clearNotification()), 5000)
  }

  const sortDescending = (anecdotes) => {
    return anecdotes.toSorted((a, b) => b.votes - a.votes)
  }

  return (
    <>
      {sortDescending(anecdotes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList