import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import apiReducer from "./slice/apiSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        api: apiReducer,
    },
});

export default store;