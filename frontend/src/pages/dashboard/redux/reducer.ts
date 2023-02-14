import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";


export const initialState = {
  posts: [{ id: 0, title: "", body: "", created_at: "", updated_at: "" }],
  pending: true,
  error: false,
};

export const dashboardReducer = createReducer(initialState, (builder) => {
});
