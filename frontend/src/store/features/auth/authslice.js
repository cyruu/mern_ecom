import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    const res = await authService.loginUser(user);
    if (res.success) {
      return res.user;
    }
    return null;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const getUserFromLocalStorage = window.localStorage.getItem("user")
  ? JSON.parse(window.localStorage.getItem("user"))
  : null;

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: getUserFromLocalStorage,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.status = "failed";
      });
  },
});

// export const {} = authSlice.actions;

export default authSlice.reducer;
