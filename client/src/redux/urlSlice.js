
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;


export const fetchUserLinks = createAsyncThunk(
  'url/fetchUserLinks',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/api/user/links`, {
        headers: { token }
      });
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch links');
    }
  }
);

export const createShortUrl = createAsyncThunk(
  'url/createShortUrl',
  async (urlData, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`${API_URL}/api/create`, urlData, {
        headers: { token }
      });
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to create URL');
    }
  }
);

export const fetchAnalytics = createAsyncThunk(
  'url/fetchAnalytics',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/api/analytics`, {
        headers: { token }
      });
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch analytics');
    }
  }
);

const urlSlice = createSlice({
  name: 'url',
  initialState: {
    links: [],
    analytics: {
      totalClicks: 0,
      clicksByDate: [],
      deviceData: [],
      browserData: [],
      topLinks: []
    },
    loading: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchUserLinks
      .addCase(fetchUserLinks.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchUserLinks.fulfilled, (state, action) => {
        state.links = action.payload;
        state.loading = 'succeeded';
      })
      .addCase(fetchUserLinks.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
      })

      // Handle createShortUrl
      .addCase(createShortUrl.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(createShortUrl.fulfilled, (state, action) => {
        state.links.push(action.payload);
        state.loading = 'succeeded';
      })
      .addCase(createShortUrl.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
      })

      // Handle fetchAnalytics
      .addCase(fetchAnalytics.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.analytics = action.payload;
        state.loading = 'succeeded';
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
      });
  }
});

export default urlSlice.reducer;