import { createSlice } from "@reduxjs/toolkit";                                      
import { fetchProducts } from "../src/features/products/productThunk";                             
const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(fetchProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
},

});
export const { addProducts, clearProducts } = productSlice.actions;
export default productSlice.reducer;


