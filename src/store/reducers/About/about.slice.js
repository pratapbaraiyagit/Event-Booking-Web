import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { showMessage } from '../common.slice';
const initialState = {
  aboutList: [],
  aboutLoading: false,
  isAboutUpdated: false,
  aboutDetail: {},
};

export const getAboutListData = createAsyncThunk(
  'admin/get-about-list-data',
  (data, { dispatch }) => {
    return new Promise((resolve, reject) => {
      axios
        .get('api/about/page_list')
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
export const getAboutData = createAsyncThunk(
  'admin/get-about-data-id',
  (_id, { dispatch }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`api/about/pages/${_id}`)
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

// export const updateBooking = createAsyncThunk(
//   'admin/update-booking',
//   (props, { dispatch }) => {
//     return new Promise((resolve, reject) => {
//       const { _id, booking } = props;
//       axios
//         .post(`api/booking/${_id}`, booking)
//         .then(res => {
//           if (res.data.err === 0) {
//             dispatch(
//               showMessage({ message: res.data.msg, varient: 'success' }),
//             );
//             resolve(res.data.data);
//           } else {
//             dispatch(showMessage({ message: res.data.msg }));
//             reject();
//           }
//         })
//         .catch(error => {
//           dispatch(showMessage({ message: error.response.data.msg }));
//           reject(error);
//         });
//     });
//   },
// );

export const aboutSlice = createSlice({
  name: 'about',
  initialState,
  reducers: {
    setAboutLoading: (state, action) => {
      state.aboutLoading = action.payload;
    },
    setIsAboutUpdated: (state, action) => {
      state.isAboutUpdated = action.payload;
    },
    setAboutDetail: (state, action) => {
      state.aboutDetail = action.payload;
    },
  },
  extraReducers: {
    [getAboutListData.pending]: state => {
      state.aboutLoading = true;
    },
    [getAboutListData.rejected]: state => {
      state.aboutList = [];
      state.aboutLoading = false;
    },
    [getAboutListData.fulfilled]: (state, action) => {
      state.aboutList = action.payload;
      state.aboutLoading = false;
    },
    [getAboutData.pending]: state => {
      state.aboutLoading = true;
      state.aboutDetail = {};
    },
    [getAboutData.rejected]: state => {
      state.aboutLoading = false;
      state.aboutDetail = {};
    },
    [getAboutData.fulfilled]: (state, action) => {
      state.aboutLoading = false;
      state.aboutDetail = action.payload;
    },
  },
});

export const { setAboutLoading, setIsAboutUpdated, setAboutDetail } =
  aboutSlice.actions;

export default aboutSlice.reducer;
