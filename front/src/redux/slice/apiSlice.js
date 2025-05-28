import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { GET_TASKS_API_URL, UPDATE_COMPLETED_TASK_API_URL } from "../../utils/apiUrl";
import { getRequest, patchRequest } from "../../utils/requests";

const getItemsFetchThunk = (actionType, apiUrl) => {
    return createAsyncThunk(actionType, async (userId) => {
        // console.log(apiUrl, userId);
        const fullpath = `${apiUrl}/${userId}`;
        return await getRequest(fullpath);
    });
};

const updateCompletedFetchThunk = (actionType, apiUrl) => {
    return createAsyncThunk(actionType, async (options) => {
        // console.log(options);
        return await patchRequest(apiUrl, options);
    });
};

export const fetchGetItems = getItemsFetchThunk(
    "fetchGetItems", 
    GET_TASKS_API_URL
);

export const fetchUpdateCompleted = updateCompletedFetchThunk(
    "fetchUpdateCompleted", 
    UPDATE_COMPLETED_TASK_API_URL
);


const handleFulfilled = (stateKey) =>(state, action) => {
    state[stateKey] = action.payload;
}

const handleRejected = (state, action) => {
    console.log("Error" + action.payload);
}

const apiSlice = createSlice({
    name: "api",
    initialState: {
        getItemsData: null,
        updateCompletedData: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetItems.fulfilled, handleFulfilled("getItemsData"))
            .addCase(fetchGetItems.rejected, handleRejected)
            .addCase(fetchUpdateCompleted.fulfilled, handleFulfilled("updateCompletedData"))
            .addCase(fetchUpdateCompleted.rejected, handleRejected);
    },
    
})

export default apiSlice.reducer;