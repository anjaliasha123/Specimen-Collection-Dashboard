import { configureStore } from "@reduxjs/toolkit";
import { inhsReducer } from "./slices/inhsSlice";

export const store = configureStore({
    reducer: {
        inhs: inhsReducer
    }
});

export * from './thunks/fetchData';