import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { showMessage } from '../common.slice';
const initialState = {
  venueList: [],
  venueAllList: [],
  contactSourceList: [],
  venueLoading: false,
  isVenueUpdated: false,
  venueDetail: {},
};

export const getVenueListData = createAsyncThunk(
  'admin/get-venue-list-data',
  (data, { dispatch }) => {
    return new Promise((resolve, reject) => {
      axios
        .get('api/venue/list')
        .then(res => {
          if (res.data.err === 0) {
            if (res.data.data) {
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

export const getVenueAllListData = createAsyncThunk(
  'admin/get-venue-all-list-data',
  (data, { dispatch }) => {
    return new Promise((resolve, reject) => {
      axios
        .get('api/venue/all/list')
        .then(res => {
          if (res.data.err === 0) {
            if (res.data.data) {
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
export const getVenueData = createAsyncThunk(
  'admin/get-venue-data-id',
  (_id, { dispatch }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`api/venue/${_id}`)
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

export const checkAvailabilityDate = createAsyncThunk(
  'admin/check-availability-date',
  (props, { dispatch }) => {
    return new Promise((resolve, reject) => {
      const { _id, data } = props;
      axios
        .post(`api/event_date/${_id}/available_places`, data)
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

export const getContactSourceListData = createAsyncThunk(
  'admin/get-contact-source-list-data',
  (data, { dispatch }) => {
    return new Promise((resolve, reject) => {
      axios
        .get('api/contact_source/list')
        .then(res => {
          if (res.data.err === 0) {
            if (res.data.data) {
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

export const venueSlice = createSlice({
  name: 'venue',
  initialState,
  reducers: {
    setVenueLoading: (state, action) => {
      state.venueLoading = action.payload;
    },
    setIsVenueUpdated: (state, action) => {
      state.isVenueUpdated = action.payload;
    },
    setVenueDetail: (state, action) => {
      state.venueDetail = action.payload;
    },
  },
  extraReducers: {
    [getVenueListData.pending]: state => {
      state.venueLoading = true;
    },
    [getVenueListData.rejected]: state => {
      state.venueList = [];
      state.venueLoading = false;
    },
    [getVenueListData.fulfilled]: (state, action) => {
      state.venueList = action.payload;
      state.venueLoading = false;
    },
    [getVenueData.pending]: state => {
      state.venueLoading = true;
      state.venueDetail = {};
    },
    [getVenueData.rejected]: state => {
      state.venueLoading = false;
      state.venueDetail = {};
    },
    [getVenueData.fulfilled]: (state, action) => {
      state.venueLoading = false;
      state.venueDetail = action.payload;
    },
    [checkAvailabilityDate.pending]: state => {
      state.isVenueUpdated = false;
      state.venueLoading = true;
    },
    [checkAvailabilityDate.rejected]: state => {
      state.isVenueUpdated = false;
      state.venueLoading = false;
    },
    [checkAvailabilityDate.fulfilled]: (state, action) => {
      state.isVenueUpdated = true;
      state.venueLoading = false;
    },
    [getVenueAllListData.pending]: state => {
      state.venueLoading = true;
    },
    [getVenueAllListData.rejected]: state => {
      state.venueAllList = [];
      state.venueLoading = false;
    },
    [getVenueAllListData.fulfilled]: (state, action) => {
      state.venueAllList = action.payload;
      state.venueLoading = false;
    },
    [getContactSourceListData.pending]: state => {
      state.venueLoading = true;
    },
    [getContactSourceListData.rejected]: state => {
      state.contactSourceList = [];
      state.venueLoading = false;
    },
    [getContactSourceListData.fulfilled]: (state, action) => {
      state.contactSourceList = action.payload;
      state.venueLoading = false;
    },
  },
});

export const { setVenueLoading, setIsVenueUpdated, setVenueDetail } =
  venueSlice.actions;

export default venueSlice.reducer;
