import { configureStore } from "@reduxjs/toolkit";                            
import productSlice from "./features/products/productSlice";
import { saveState } from "./utils/localStorage";


const store = configureStore({
  reducer: {
    product: productSlice,
  }
});

store.subscribe(() => {
  const { product } = store.getState();
  saveState("product", product)
});

export default store;

