import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import SetCookies from 'hooks/SetCookies';
import { showMessage } from './common.slice';
const initialState = {
  isLogOut: false,
  loginLoading: false,
  isUserLogin: false,
  forgotPasswordLoading: false,
  isUserForgotPassword: false,
  signupLoading: false,
  isUserSignup: false,
  resetPasswordLoading: false,
  isUserResetPassword: false,
};

export const loginAction = createAsyncThunk(
  'auth/login',
  (dataProp, { dispatch }) => {
    return new Promise((resolve, reject) => {
      axios
        .post('bpe-user/login', dataProp)
        .then(res => {
          if (Object.keys(res.data.data).length > 0) {
            axios.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${res.data.data.Token}`;
            SetCookies('Token', btoa(res.data.data.Token));
            SetCookies(
              'UserSession',
              btoa(JSON.stringify(res.data.data.Userdata)),
            );
            resolve(res.data.data);
            dispatch(
              showMessage({ message: res.data.msg, varient: 'success' }),
            );
          } else {
            dispatch(showMessage({ message: res.data.msg }));
            reject({ message: res.data.msg });
          }
        })
        .catch(error => {
          dispatch(showMessage({ message: error.response.data.msg }));
          reject(error);
        });
    });
  },
);

export const forgotPasswordAction = createAsyncThunk(
  'auth/forgot-password',
  (dataProp, { dispatch }) => {
    return new Promise((resolve, reject) => {
      axios
        .post('bpe-user/forgot-password', dataProp)
        .then(res => {
          if (Object.keys(res.data).length > 0) {
            console.log('res', res);
            resolve(res.data);
            dispatch(
              showMessage({ message: res.data.msg, varient: 'success' }),
            );
          } else {
            dispatch(showMessage({ message: res.data.msg }));
            reject({ message: res.data.msg });
          }
        })
        .catch(error => {
          dispatch(showMessage({ message: error.response.data.msg }));
          reject(error);
        });
    });
  },
);

export const signupAction = createAsyncThunk(
  'auth/signup',
  (dataProp, { dispatch }) => {
    return new Promise((resolve, reject) => {
      axios
        .post('bpe-user/register', dataProp)
        .then(res => {
          if (Object.keys(res.data.data).length > 0) {
            resolve(res.data.data);
            dispatch(
              showMessage({ message: res.data.msg, varient: 'success' }),
            );
          } else {
            dispatch(showMessage({ message: res.data.msg }));
            reject({ message: res.data.msg });
          }
        })
        .catch(error => {
          dispatch(showMessage({ message: error.response.data.msg }));
          reject(error);
        });
    });
  },
);

export const resetPasswordAction = createAsyncThunk(
  'auth/resetpassword',
  (props, { dispatch }) => {
    return new Promise((resolve, reject) => {
      const { token, obj } = props;
      axios
        .post(`bpe-user/reset-password${token}`, obj)
        .then(res => {
          if (Object.keys(res.data.data).length > 0) {
            resolve(res.data.data);
            dispatch(
              showMessage({ message: res.data.msg, varient: 'success' }),
            );
          } else {
            dispatch(showMessage({ message: res.data.msg }));
            reject({ message: res.data.msg });
          }
        })
        .catch(error => {
          dispatch(showMessage({ message: error.response.data.msg }));
          reject(error);
        });
    });
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLogout: (state, action) => {
      state.isLogOut = action.payload;
    },
    setIsUserLogin: (state, action) => {
      state.isUserLogin = action.payload;
    },
    setLoginLoading: (state, action) => {
      state.loginLoading = action.payload;
    },

    setIsForgotPassword: (state, action) => {
      state.isUserForgotPassword = action.payload;
    },
    setForgotPasswordLoading: (state, action) => {
      state.forgotPasswordLoading = action.payload;
    },

    setIsSignup: (state, action) => {
      state.isUserSignup = action.payload;
    },
    setSignupLoading: (state, action) => {
      state.signupLoading = action.payload;
    },

    setIsResetPassword: (state, action) => {
      state.isUserResetPassword = action.payload;
    },
    setResetPasswordLoading: (state, action) => {
      state.resetPasswordLoading = action.payload;
    },
  },
  extraReducers: {
    [loginAction.pending]: state => {
      state.isUserLogin = false;
      state.loginLoading = true;
    },
    [loginAction.rejected]: state => {
      state.isUserLogin = false;
      state.loginLoading = false;
    },
    [loginAction.fulfilled]: (state, action) => {
      state.isUserLogin = true;
      state.loginLoading = false;
    },
    [forgotPasswordAction.pending]: state => {
      state.forgotPasswordLoading = true;
      state.isUserForgotPassword = false;
    },
    [forgotPasswordAction.rejected]: state => {
      state.forgotPasswordLoading = false;
      state.isUserForgotPassword = false;
    },
    [forgotPasswordAction.fulfilled]: (state, action) => {
      state.forgotPasswordLoading = false;
      state.isUserForgotPassword = true;
    },
    [signupAction.pending]: state => {
      state.isUserSignup = false;
      state.signupLoading = true;
    },
    [signupAction.rejected]: state => {
      state.isUserSignup = false;
      state.signupLoading = false;
    },
    [signupAction.fulfilled]: (state, action) => {
      state.signupLoading = false;
      state.isUserSignup = true;
    },
    [resetPasswordAction.pending]: state => {
      state.resetPasswordLoading = true;
      state.isUserResetPassword = false;
    },
    [resetPasswordAction.rejected]: state => {
      state.resetPasswordLoading = false;
      state.isUserResetPassword = false;
    },
    [resetPasswordAction.fulfilled]: (state, action) => {
      state.resetPasswordLoading = false;
      state.isUserResetPassword = true;
    },
  },
});

export const {
  setIsLogout,
  setIsUserLogin,
  setLoginLoading,
  setForgotPasswordLoading,
  setIsForgotPassword,
  setSignupLoading,
  setIsSignup,
  setResetPasswordLoading,
  setIsResetPassword,
} = authSlice.actions;

export default authSlice.reducer;
