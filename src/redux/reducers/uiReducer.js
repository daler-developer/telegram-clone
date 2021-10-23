import { createSlice } from "@reduxjs/toolkit"


const uiReducer = createSlice({
  name: 'ui',
  initialState: {
    createChatWindowVisibility: false,
    sidebarVisibility: false,
    searchMessagePanelVisibility: false
  },
  reducers: {
    toggleCreateChatWindowVisibility(state, { payload }) {
      state.createChatWindowVisibility = !state.createChatWindowVisibility
    },
    toggleSidebarVisibility(state, { payload }) {
      state.sidebarVisibility = !state.sidebarVisibility
    },
    toggleSearchMessagePanelVisibility(state, { payload }) {
      state.searchMessagePanelVisibility = !state.searchMessagePanelVisibility
    },
    setSearchMessagePanelVisibility(state, { payload }) {
      state.searchMessagePanelVisibility = payload.to
    },
    setSidebarVisibility(state, { payload }) {
      state.sidebarVisibility = payload.to
    }
  }
})

export const uiActions  = uiReducer.actions

export const selectCreateChatWindowVisibility = (state) => {
  return state.ui.createChatWindowVisibility
}

export const selectSidebarVisibility = (state) => {
  return state.ui.sidebarVisibility
}

export const selectSearchMessagePanelVisibility = (state) => {
  return state.ui.searchMessagePanelVisibility
}

export default uiReducer.reducer