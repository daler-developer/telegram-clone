import { createSlice } from "@reduxjs/toolkit"


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null
  },
  reducers: {
    // ------------
    login(state, { payload }) {
      const { id, displayName, photoURL } = payload
      state.isAuthenticated = true
      state.user = { id, displayName, photoURL }
    },
    // ------------
    logout(state, { payload }) {
      state.isAuthenticated = false
      state.user = null
    },
    // ------------
  }
})

const authActions = authSlice.actions


export { authActions }

export default authSlice.reducer