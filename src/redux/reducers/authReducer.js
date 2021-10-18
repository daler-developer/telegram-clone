import { createSlice } from "@reduxjs/toolkit"


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null
  },
  reducers: {
    login(state, { payload }) {
      const { uid, displayName, photoURL } = payload
      state.isAuthenticated = true
      state.user = { uid, displayName, photoURL }
    },
    logout(state, { payload }) {
      state.isAuthenticated = false
      state.user = null
    }
  }
})


export const authActions = authSlice.actions

export const selectIsAuthenticated = (state) => {
  return state.auth.isAuthenticated
}

export const selectUser = (state) => {
  return state.auth.user
}

export default authSlice.reducer