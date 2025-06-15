import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  messageOptions: 'success added',
  varient: '',
  showMessage: false,
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    showMessage: (state, action) => {
      state.message = action.payload.message;
      state.varient = action.payload.varient;
      state.showMessage = true;
    },
    hideMessage: (state, action) => {
      state.showMessage = false;
    },
  },
  extraReducers: {},
});
export const { showMessage, hideMessage } = commonSlice.actions;
export default commonSlice.reducer;
