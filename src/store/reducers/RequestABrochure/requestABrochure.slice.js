import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { showMessage } from '../common.slice';

const initialState = {
  requestABrochureLoading: false,
  requestABrochureUpdated: false,
  requestABrochureDetail: {},
};

export const getRequestBrochureData = createAsyncThunk(
  'admin/get-request-brochure-data',
  (payload, { dispatch }) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`api/request_brochure`, payload)
        .then(res => {
          if (res.data.err === 0) {
            if (Object.keys(res.data.data).length > 0) {
              resolve(res.data.data);
            } else {
              resolve([]);
            }
          } else {
            dispatch(showMessage({ message: res.data.msg }));
            reject();
          }
        })
        .catch(error => {
          dispatch(showMessage({ message: error.response.data.msg }));
          reject(error);
        });
    });
  },
);

export const requestABrochureSlice = createSlice({
  name: 'requestABrochure',
  initialState,
  reducers: {
    setRequestABrochureLoading: (state, action) => {
      state.requestABrochureLoading = action.payload;
    },
    setRequestABrochureDetail: (state, action) => {
      state.requestABrochureDetail = action.payload;
    },
    setRequestABrochureUpdated: (state, action) => {
      state.requestABrochureUpdated = action.payload;
    },
  },
  extraReducers: {
    [getRequestBrochureData.pending]: state => {
      state.requestABrochureLoading = true;
      state.requestABrochureDetail = {};
      state.requestABrochureUpdated = false;
    },
    [getRequestBrochureData.rejected]: state => {
      state.requestABrochureLoading = false;
      state.requestABrochureDetail = {};
      state.requestABrochureUpdated = false;
    },
    [getRequestBrochureData.fulfilled]: (state, action) => {
      state.requestABrochureLoading = false;
      state.requestABrochureDetail = action.payload;
      state.requestABrochureUpdated = true;
    },
  },
});

export const {
  setRequestABrochureLoading,
  setRequestABrochureDetail,
  setRequestABrochureUpdated,
} = requestABrochureSlice.actions;

export default requestABrochureSlice.reducer;
