import { configureStore } from "@reduxjs/toolkit";
import posSlice from "./features/pos/posSlice";
import authSlice from "./features/auths/authSlice";
import productSlice from "./features/products/productSlice";
import cartSlice from "./features/carts/cartSlice";
import sessionMiddleware from "./middleware/sessionMiddleware";
import { loadState, saveState } from "./utils/localStorage";

// Load initial state from localStorage
const persistedAuthState = loadState("auth");
const persistedPosState = loadState("pos");
const persistedCartState = loadState("cart");

const store = configureStore({
  reducer: {
    pos: posSlice,
    auth: authSlice,
    product: productSlice,
    cart: cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sessionMiddleware),
  preloadedState: {
    auth: persistedAuthState,
    pos: persistedPosState,
    cart: persistedCartState,
  },
});

store.subscribe(() => {
  const { auth, pos, cart } = store.getState();
  saveState("auth", auth)
  saveState("pos", pos)
  saveState("cart", cart)
});

export default store;

/*
     [How to use]
     const state = store.getState();
     console.log(state.user);
*/
