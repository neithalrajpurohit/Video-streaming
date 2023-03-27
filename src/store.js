import { configureStore } from "@reduxjs/toolkit";
import cardReducer from "./features/card/cardSlice";
import bucketReducer from "./features/bucket/bucketSlice";

export const store = configureStore({
    reducer: {
        card: cardReducer,
        bucket: bucketReducer,
    },
});
