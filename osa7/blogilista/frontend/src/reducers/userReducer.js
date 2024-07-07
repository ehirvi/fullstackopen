import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/loginService'
import blogService from '../services/blogService'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      return action.payload
    },
    clearUser: (state) => {
      return null
    },
  },
})

export const { setUser, clearUser } = userSlice.actions

export const getUser = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(loggedUser))
      blogService.setToken(loggedUser.token)
    }
  }
}

export const loginUser = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
    } catch (error) {
      dispatch(
        showNotification({
          text: 'Wrong username or password',
          status: 'error',
        }),
      )
    }
  }
}

export const logoutUser = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedUser')
    dispatch(clearUser())
  }
}

export default userSlice.reducer
