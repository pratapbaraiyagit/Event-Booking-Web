import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { showMessage } from '../common.slice';
const initialState = {
  guestList: [],
  guestLoading: false,
  isGuestUpdated: false,
  guestDetail: {},
  previousGuestDetail: {},
  previousGuestList: [],
  importGuestList: [],
  guestMailTemplateList: [],
  guestEmailDetail: {},
  isGuestImported: false,
  isSendEmail: false,
};

export const getGuestListData = createAsyncThunk(
  'admin/get-guest-list',
  ({ booking_id }, { dispatch }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`api/booking/${booking_id}/guest`)
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
export const getGuestData = createAsyncThunk(
  'admin/get-guest-single',
  ({ booking_id, guest_id }, { dispatch }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`api/booking/${booking_id}/guest/${guest_id}`)
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
export const getPreviousGuestData = createAsyncThunk(
  'admin/get-previous_guest',
  ({ booking_id }, { dispatch }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`api/booking/${booking_id}/previous_guests`)
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
export const createUpdateBookingGuest = createAsyncThunk(
  'admin/create-update-booking-guest',
  (props, { dispatch }) => {
    return new Promise((resolve, reject) => {
      const { booking_id, booking } = props;
      axios
        .post(`api/booking/${booking_id}/guest`, booking)
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
export const importGuest = createAsyncThunk(
  'admin/import-guest',
  ({ booking_id, data }, { dispatch }) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`api/booking/${booking_id}/guest/import`, data)
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
export const importPreviousGuest = createAsyncThunk(
  'admin/import-previous-guest',
  ({ booking_id, data }, { dispatch }) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`api/booking/${booking_id}/guest/import_previous`, data)
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
export const deleteGuest = createAsyncThunk(
  'admin/delete-guest',
  (props, { dispatch }) => {
    return new Promise((resolve, reject) => {
      const { booking_id, guest_id } = props;
      axios
        .delete(`api/booking/${booking_id}/guest/${guest_id}`)
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

export const getPreviousGuestListData = createAsyncThunk(
  'admin/get-previous-guest-list',
  ({ booking_id }, { dispatch }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`api/booking/${booking_id}/previous_guests`)
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

export const getImportGuestsListData = createAsyncThunk(
  'admin/get-import-guests-list',
  ({ booking_id, payload }, { dispatch }) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`api/booking/${booking_id}/guest/import`, payload)
        .then(res => {
          if (res.data.err === 0) {
            if (res.data.data.length > 0) {
              resolve(res.data.data);
              dispatch(
                showMessage({ message: 'File Upload', varient: 'success' }),
              );
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

export const getGuestMailTemplateListData = createAsyncThunk(
  'admin/get-guest-mail-template-list',
  ({ data }, { dispatch }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`api/guest_email/list`)
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

export const getGuestMailTemplateData = createAsyncThunk(
  'admin/get-guest-single-mail-template',
  ({ transactional_email_id }, { dispatch }) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`api/guest_email/${transactional_email_id}`)
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

export const sendEmail = createAsyncThunk(
  'admin/send-email',
  (props, { dispatch }) => {
    return new Promise((resolve, reject) => {
      const { payload } = props;
      axios
        .post(`api/email/send_email`, payload)
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

export const guestSlice = createSlice({
  name: 'guest',
  initialState,
  reducers: {
    setIsGuestUpdated: (state, action) => {
      state.isGuestUpdated = action.payload;
    },
    setGuestDetail: (state, action) => {
      state.guestDetail = action.payload;
    },
    setGuestEmailDetail: (state, action) => {
      state.guestEmailDetail = action.payload;
    },
    setImportGuestsListData: (state, action) => {
      state.importGuestList = action.payload;
    },
  },
  extraReducers: {
    [getGuestListData.pending]: state => {
      state.guestLoading = true;
    },
    [getGuestListData.rejected]: state => {
      state.guestList = [];
      state.guestLoading = false;
    },
    [getGuestListData.fulfilled]: (state, action) => {
      state.guestList = action.payload;
      state.guestLoading = false;
    },
    [getGuestData.pending]: state => {
      state.guestLoading = true;
      state.guestDetail = {};
    },
    [getGuestData.rejected]: state => {
      state.guestLoading = false;
      state.guestDetail = {};
    },
    [getGuestData.fulfilled]: (state, action) => {
      state.guestLoading = false;
      state.guestDetail = action.payload;
    },
    [getPreviousGuestData.pending]: state => {
      state.guestLoading = true;
      state.previousGuestDetail = {};
    },
    [getPreviousGuestData.rejected]: state => {
      state.guestLoading = false;
      state.previousGuestDetail = {};
    },
    [getPreviousGuestData.fulfilled]: (state, action) => {
      state.guestLoading = false;
      state.previousGuestDetail = action.payload;
    },
    [createUpdateBookingGuest.pending]: state => {
      state.isGuestUpdated = false;
      state.guestLoading = true;
    },
    [createUpdateBookingGuest.rejected]: state => {
      state.isGuestUpdated = false;
      state.guestLoading = false;
    },
    [createUpdateBookingGuest.fulfilled]: (state, action) => {
      state.isGuestUpdated = true;
      state.guestLoading = false;
    },
    [importGuest.pending]: state => {
      state.isGuestImported = false;
      state.guestLoading = true;
    },
    [importGuest.rejected]: state => {
      state.isGuestImported = false;
      state.guestLoading = false;
    },
    [importGuest.fulfilled]: (state, action) => {
      state.isGuestImported = true;
      state.guestLoading = false;
    },
    [importPreviousGuest.pending]: state => {
      state.isGuestImported = false;
      state.guestLoading = true;
    },
    [importPreviousGuest.rejected]: state => {
      state.isGuestImported = false;
      state.guestLoading = false;
    },
    [importPreviousGuest.fulfilled]: (state, action) => {
      state.isGuestImported = true;
      state.guestLoading = false;
    },
    [deleteGuest.pending]: state => {
      state.isGuestUpdated = false;
      state.guestLoading = true;
    },
    [deleteGuest.rejected]: state => {
      state.isGuestUpdated = false;
      state.guestLoading = false;
    },
    [deleteGuest.fulfilled]: (state, action) => {
      state.isGuestUpdated = true;
      state.guestLoading = false;
    },
    [getPreviousGuestListData.pending]: state => {
      state.guestLoading = true;
    },
    [getPreviousGuestListData.rejected]: state => {
      state.previousGuestList = [];
      state.guestLoading = false;
    },
    [getPreviousGuestListData.fulfilled]: (state, action) => {
      state.previousGuestList = action.payload;
      state.guestLoading = false;
    },
    [getImportGuestsListData.pending]: state => {
      state.guestLoading = true;
    },
    [getImportGuestsListData.rejected]: state => {
      state.importGuestList = [];
      state.guestLoading = false;
    },
    [getImportGuestsListData.fulfilled]: (state, action) => {
      state.importGuestList = action.payload;
      state.guestLoading = false;
    },
    [getGuestMailTemplateListData.pending]: state => {
      state.guestLoading = true;
    },
    [getGuestMailTemplateListData.rejected]: state => {
      state.guestMailTemplateList = [];
      state.guestLoading = false;
    },
    [getGuestMailTemplateListData.fulfilled]: (state, action) => {
      state.guestMailTemplateList = action.payload;
      state.guestLoading = false;
    },
    [getGuestMailTemplateData.pending]: state => {
      state.guestLoading = true;
      state.guestEmailDetail = {};
    },
    [getGuestMailTemplateData.rejected]: state => {
      state.guestLoading = false;
      state.guestEmailDetail = {};
    },
    [getGuestMailTemplateData.fulfilled]: (state, action) => {
      state.guestLoading = false;
      state.guestEmailDetail = action.payload;
    },
    [sendEmail.pending]: state => {
      state.isSendEmail = false;
      state.guestLoading = true;
    },
    [sendEmail.rejected]: state => {
      state.isSendEmail = false;
      state.guestLoading = false;
    },
    [sendEmail.fulfilled]: state => {
      state.isSendEmail = true;
      state.guestLoading = false;
    },
  },
});

export const {
  setIsGuestUpdated,
  setGuestDetail,
  setGuestEmailDetail,
  setImportGuestsListData,
} = guestSlice.actions;

export default guestSlice.reducer;
