import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => (
    state.anecdotes.filter(anecdote =>
      anecdote.content.toLowerCase()
        .includes(state.filter.toLowerCase()))))

  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(setNotification(`You voted \'${anecdote.content}\'`, 5))

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