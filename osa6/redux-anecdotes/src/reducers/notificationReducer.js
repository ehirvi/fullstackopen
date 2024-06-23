import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    changeNotification(state, action) {
      return action.payload
    }
  }
})

export const { changeNotification } = notificationSlice.actions

export const setNotification = (message, time) => {
  return async (dispatch) => {
    setTimeout(() => dispatch(changeNotification('')), time * 1000)
    dispatch(changeNotification(message))
  }
}

export default notificationSlice.reducer