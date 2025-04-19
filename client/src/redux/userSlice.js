
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const API_URL = import.meta.env.VITE_API_BASE_URL;



export const registerUser = createAsyncThunk(
  'user/register',
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}/api/register`, { email, password });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}/api/login`, { email, password });
      console.log(res)
      localStorage.setItem('token', res.data.token);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);




const userSlice = createSlice({
  name: 'user',
  initialState: {
    userId: '',
    loading: 'idle',
    error: null,
    token: localStorage.getItem('token') || '',
    linkData: [],
  },
  reducers: {
    logout: (state) => {
      state.token = '';
      state.userId = '';
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = 'succeeded';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.token = action.payload.token;
        localStorage.setItem('token', state.token)
        state.userId = action.payload.userId;

      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
      });
  }


});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
