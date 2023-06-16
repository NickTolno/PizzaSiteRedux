import { configureStore } from '@reduxjs/toolkit';
import pizzasSlice from './slices/pizzasSlice';
import cartSlice from './slices/cartSlice';
import filterSlice from './slices/filterSlice';
import pizzaItemSlice from './slices/pizzaItemSlice';

export const store = configureStore({
  reducer: {
    pizzas: pizzasSlice,
    cart: cartSlice,
    filter: filterSlice,
    pizzaItem: pizzaItemSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch