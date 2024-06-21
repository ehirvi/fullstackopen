import { createSlice } from "@reduxjs/toolkit"


// export const addVote = (id) => {
//   return {
//     type: 'VOTE',
//     payload: {
//       id: id
//     }
//   }
// }

// export const createAnecdote = (anecdote) => {
//   return {
//     type: 'NEW_ANECDOTE',
//     payload: asObject(anecdote)
//   }
// }

// const anecdoteReducer = (state = initialState, action) => {
//   // console.log('state now: ', state)
//   // console.log('action', action)

//   switch (action.type) {
//     case 'NEW_ANECDOTE':
//       return sortDescending([...state, action.payload])

//     case 'VOTE':
//       const id = action.payload.id
//       const anecdoteToChange = state.find(anecdote => anecdote.id === id)
//       const changedAnecdote = {
//         ...anecdoteToChange,
//         votes: anecdoteToChange.votes + 1
//       }
//       return sortDescending(state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote))

//     default:
//       return sortDescending(state)
//   }
// }

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    addVote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
    },
    createAnecdote(state, action) {
      state.push(asObject(action.payload))
    }
  }
})

export const { addVote, createAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer