import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateOne } from './requests'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
    refetchOnWindowFocus: false
  })

  const likedAnecdoteMutation = useMutation({
    mutationFn: updateOne,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(anecdote => anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote))
      notificationDispatch({ type: 'SET_NOTIFICATION', payload: `Voted anecdote \'${updatedAnecdote.content}\'` })
      setTimeout(() => notificationDispatch({ type: 'CLEAR_NOTIFICATION' }), 5000)
    }
  })

  const handleVote = (anecdote) => {
    // console.log('vote')
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    likedAnecdoteMutation.mutate(updatedAnecdote)
  }

  if (result.isLoading) {
    return <div>Loading...</div>
  }

  if (result.isError) {
    return <div>Anecdote service is not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />


      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
