import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { showMessage } from '../common.slice';
const initialState = {
  bookingList: [],
  bookingLoading: false,
  isBookingUpdated: false,
  isMakePayment: false,
  bookingDetail: {},
  payByBankDetail: {},
};

export const getBookingListData = createAsyncThunk(
  'admin/get-booking-list',
  (data, { dispatch }) => {
    return new Promise((resolve, reject) => {
      axios
        .get('api/booking/list')
        .then(res => {
          if (res.data.err === 0) {
            if (res.data.data.length > 0) {
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
export const getBookingData = createAsyncThunk(
  'admin/get-booking',
  (_id, { dispatch }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`api/booking/${_id}`)
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
export const createBooking = createAsyncThunk(
  'admin/create-booking',
  (booking, { dispatch }) => {
    return new Promise((resolve, reject) => {
      axios
        .post('api/booking/create', booking)
        .then(res => {
          if (res.data.err === 0) {
            dispatch(
              showMessage({ message: res.data.msg, varient: 'success' }),
            );
            resolve(res.data);
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
export const updateBooking = createAsyncThunk(
  'admin/update-booking',
  (props, { dispatch }) => {
    return new Promise((resolve, reject) => {
      const { _id, booking } = props;
      axios
        .post(`api/booking/${_id}`, booking)
        .then(res => {
          if (res.data.err === 0) {
            dispatch(
              showMessage({ message: res.data.msg, varient: 'success' }),
            );
            resolve(res.data.data);
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

export const makePayment = createAsyncThunk(
  'admin/make-payment',
  (booking, { dispatch }) => {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/make_payment', booking)
        .then(res => {
          if (res.data.err === 0) {
            dispatch(
              showMessage({ message: res.data.msg, varient: 'success' }),
            );
            resolve(res.data);
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

export const getPayByBank = createAsyncThunk(
  'admin/get-pay-by-bank',
  (_id, { dispatch }) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`api/booking/${_id}/confirmterms`)
        .then(res => {
          if (res.data.err === 0) {
            if (Object.keys(res.data.data).length > 0) {
              resolve(res.data.data[0]);
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

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setBookingLoading: (state, action) => {
      state.bookingLoading = action.payload;
    },
    setIsBookingUpdated: (state, action) => {
      state.isBookingUpdated = action.payload;
    },
    setIsMakePayment: (state, action) => {
      state.isMakePayment = action.payload;
    },
    setBookingDetail: (state, action) => {
      state.bookingDetail = action.payload;
    },
    setPayByBankDetail: (state, action) => {
      state.payByBankDetail = action.payload;
    },
  },
  extraReducers: {
    [getBookingListData.pending]: state => {
      state.bookingLoading = true;
    },
    [getBookingListData.rejected]: state => {
      state.bookingList = [];
      state.bookingLoading = false;
    },
    [getBookingListData.fulfilled]: (state, action) => {
      state.bookingList = action.payload;
      state.bookingLoading = false;
    },
    [getBookingData.pending]: state => {
      state.bookingLoading = true;
      state.bookingDetail = {};
    },
    [getBookingData.rejected]: state => {
      state.bookingLoading = false;
      state.bookingDetail = {};
    },
    [getBookingData.fulfilled]: (state, action) => {
      state.bookingLoading = false;
      state.bookingDetail = action.payload;
    },
    [createBooking.pending]: state => {
      state.isBookingUpdated = false;
      state.bookingLoading = true;
    },
    [createBooking.rejected]: state => {
      state.isBookingUpdated = false;
      state.bookingLoading = false;
    },
    [createBooking.fulfilled]: (state, action) => {
      state.isBookingUpdated = true;
      state.bookingLoading = false;
    },
    [updateBooking.pending]: state => {
      state.isBookingUpdated = false;
      state.bookingLoading = true;
    },
    [updateBooking.rejected]: state => {
      state.isBookingUpdated = false;
      state.bookingLoading = false;
    },
    [updateBooking.fulfilled]: (state, action) => {
      state.isBookingUpdated = true;
      state.bookingLoading = false;
    },
    [makePayment.pending]: state => {
      state.isMakePayment = false;
      state.bookingLoading = true;
    },
    [makePayment.rejected]: state => {
      state.isMakePayment = false;
      state.bookingLoading = false;
    },
    [makePayment.fulfilled]: (state, action) => {
      state.isMakePayment = true;
      state.bookingLoading = false;
    },
    [getPayByBank.pending]: state => {
      state.bookingLoading = true;
      state.payByBankDetail = {};
    },
    [getPayByBank.rejected]: state => {
      state.bookingLoading = false;
      state.payByBankDetail = {};
    },
    [getPayByBank.fulfilled]: (state, action) => {
      state.bookingLoading = false;
      state.payByBankDetail = action.payload;
    },
  },
});

export const {
  setBookingLoading,
  setIsBookingUpdated,
  setBookingDetail,
  setIsMakePayment,
  setPayByBankDetail,
} = bookingSlice.actions;

export default bookingSlice.reducer;
