import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  text: '',
  status: '',
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      return action.payload
    },
  },
})

export const { setNotification } = notificationSlice.actions

export const showNotification = (notification) => {
  return (dispatch) => {
    dispatch(setNotification(notification))
    setTimeout(() => {
      dispatch(setNotification(initialState))
    }, 5000)
  }
}

export default notificationSlice.reducer
