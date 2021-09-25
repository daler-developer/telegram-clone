import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const loadUsers = createAsyncThunk('common/loadUsers', async (arg, thunkAPI) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const users = await response.json()

  // throw new Error('Daler')
  return Promise.reject(new Error('Daler'))
})

const commonSlice = createSlice({
  name: 'common',
  initialState: {
    isLoading: false,
    users: []
  },
  reducers: {

  },
  extraReducers: {
    [loadUsers.pending](state, action) {
      state.isLoading = true
    },
    [loadUsers.fulfilled](state, action) {
      state.users = action.payload
      state.isLoading = false
    },
    [loadUsers.rejected](state, action) {
      console.log('_Error', action.error)
    }
  }
})

export const {} = commonSlice.actions

export default commonSlice.reducer