import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    try {
      const response = await axios.get('https://randomuser.me/api/?results=10');
      return response.data.results;
    } catch (error) {
      return Promise.reject(error.message ? error.message : error);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: { users: [], isLoading: false, error: undefined },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export const { actions, reducer } = usersSlice;

export default usersSlice;