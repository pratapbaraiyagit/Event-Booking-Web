import axios from 'axios';
import { showMessage } from '../common.slice';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  enquiresLoading: false,
  isEnquiresUpdated: false,
  bookingDetail: {},
};

export const sendEnquires = createAsyncThunk(
  'admin/send-enquires',
  (enquires, { dispatch }) => {
    return new Promise((resolve, reject) => {
      axios
        .post('enquiry/send', enquires)
        .then(res => {
          if (res.data.err === 0) {
            dispatch(
              showMessage({
                message: 'successfully created',
                varient: 'success',
              }),
            );
            resolve(res.data);
          } else {
            dispatch(showMessage({ message: 'successfully created' }));
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
export const enquiresSlice = createSlice({
  name: 'enquires',
  initialState,
  reducers: {
    setEnquiresLoading: (state, action) => {
      state.enquiresLoading = action.payload;
    },
    setIsEnquiresUpdated: (state, action) => {
      state.isEnquiresUpdated = action.payload;
    },
  },
  extraReducers: {
    [sendEnquires.pending]: state => {
      state.isEnquiresUpdated = false;
      state.enquiresLoading = true;
    },
    [sendEnquires.rejected]: state => {
      state.isEnquiresUpdated = false;
      state.enquiresLoading = false;
    },
    [sendEnquires.fulfilled]: state => {
      state.isEnquiresUpdated = true;
      state.enquiresLoading = false;
    },
  },
});

export const { setEnquiresLoading, setIsEnquiresUpdated } =
  enquiresSlice.actions;

export default enquiresSlice.reducer;
