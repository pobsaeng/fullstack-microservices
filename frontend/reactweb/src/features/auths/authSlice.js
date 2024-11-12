import { createSlice } from "@reduxjs/toolkit";
import { fetchToken } from "./authThunk";  // Ensure the import is correct (authThrunk -> authThunk)

const initialState = {
  token: null,
  loading: false,
  error: null,
  isLoggedIn: false,
  userInfo: null,
  statusMsg: '',
  status: ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload;
      state.error = null;
    },
    loginFailed: (state, action) => {
      state.isLoggedIn = false;
      state.token = null;
      state.error = action.payload.error;
    },
    logoutSuccess: (state, action) => {
      state.token = null;
      state.userInfo = null;
      state.isLoggedIn = false;
      state.error = null;
      state.statusMsg = action.payload;
      console.log(action.payload.statusMsg);
    },
    setErrorMsg: (state, action)=> {
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchToken.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(fetchToken.fulfilled, (state, action) => {
        state.token = action.payload.access_token;
        state.userInfo = action.payload;
        state.status = 'succeeded';
        state.loading = false;
      })
      .addCase(fetchToken.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.loading = false;
        state.token = null;

      });
  },
});
export const { loginSuccess, loginFailed, logoutSuccess, setErrorMsg } = authSlice.actions;
export default authSlice.reducer;
