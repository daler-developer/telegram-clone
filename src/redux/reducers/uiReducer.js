import { createSlice } from "@reduxjs/toolkit"


const uiReducer = createSlice({
  name: 'ui',
  initialState: {
    createChatWindowVisibility: false
  },
  reducers: {
    toggleCreateChatWindowVisibility(state, { payload }) {
      state.createChatWindowVisibility = !state.createChatWindowVisibility
    }
  }
})

export const uiActions  = uiReducer.actions

export const selectCreateChatWindowVisibility = (state) => {
  return state.ui.createChatWindowVisibility
}

export default uiReducer.reducer