import { createSlice } from "@reduxjs/toolkit"

const initialState = 'Hello world!'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      return action.payload
    }
  }
})

export const { showNotification } = notificationSlice.actions
export default notificationSlice.reducer