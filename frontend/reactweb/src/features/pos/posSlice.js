import { createSlice } from "@reduxjs/toolkit";
import {submitItems} from "./posThunk";

const items = [];
const posSlice = createSlice({
  name: "pos",
  initialState: {
    items: items,
    loading: false,
    error: null
  },
  reducers: {
    loadData: (state, action) => {
      state.items = action.payload;
    },
    startLoading: (state) => {
      state.loading = true;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.code === newItem.code
      );

      if (existingItem) {
        // Update amount and total if item already exists
        existingItem.amount += newItem.amount;
        existingItem.total = existingItem.amount * existingItem.price;
      } else {
        // Add new item with calculated total
        state.items.push({
          ...newItem,
          total: newItem.price * newItem.amount,
        });
      }
    },
    updateItem: (state, action) => {
      const { id, ...item } = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === id);

      if (itemIndex !== -1) {
        // Update the item by merging existing properties with updated properties
        state.items[itemIndex] = {
          ...state.items[itemIndex],
          ...item,
        };
      }
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearItems: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = [];
      })
      .addCase(submitItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  loadData,
  startLoading,
  setError,
  stopLoading,
  addItem,
  updateItem,
  deleteItem,
  clearItems
} = posSlice.actions;
export default posSlice.reducer;
