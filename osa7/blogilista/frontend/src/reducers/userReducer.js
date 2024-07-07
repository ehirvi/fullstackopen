import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/userService'
import { showNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers: (state, action) => {
      return action.payload
    },
  },
})

export const { setUsers } = userSlice.actions

export const getUsers = () => {
  return async (dispatch) => {
    try {
      const users = await userService.getAll()
      dispatch(setUsers(users))
    } catch (error) {
      dispatch(
        showNotification({
          text: 'Could not connect to the server',
          type: 'error',
        }),
      )
    }
  }
}

export default userSlice.reducer
