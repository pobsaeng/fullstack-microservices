import { createAsyncThunk } from "@reduxjs/toolkit";
import { postRequest } from "../../api/backendAPI";

export const submitItems = createAsyncThunk(
  "pos/submitItems",
  async (items, { rejectWithValue }) => {
    try {
      const response = await postRequest("/sale", items);
      return response;
    } catch (error) {
      const serializedError = {
        status: error.response?.status,
        data: error.response?.data,
      };
      return rejectWithValue(serializedError);
    }
  }
);
