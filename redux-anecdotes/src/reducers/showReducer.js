import { createSlice } from "@reduxjs/toolkit";

const showSlice = createSlice({
  name: 'show',
  initialState: {
    isShow: false,
    content: ''
  },
  reducers: {
    show(state, action) {
      state.isShow = true
      state.content = action.payload
    },
    hide(state, action) {
      state.isShow = false
      state.content = ''
    }
  }
})

export const toggleNotice = (content, seconds) => {
  return async dispatch => {
    dispatch(show(content))
    setTimeout(() => {
      dispatch(hide())
    }, seconds * 1000)
  }
}

export const {
  show,
  hide,
} = showSlice.actions
export default showSlice.reducer
