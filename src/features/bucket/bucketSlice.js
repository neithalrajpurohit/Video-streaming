import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://localhost:4000";

export const fetchAllBuckets = createAsyncThunk(
    "bucket/get",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${URL}/buckets`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchBucketDetails = createAsyncThunk(
    "bucket/details",
    async (data, { rejectWithValue }) => {
        try {
            const { cardId } = data;
            const response = await axios.get(
                `${URL}/buckets/${cardId}?_embed=cards`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateBucketDetails = createAsyncThunk(
    "bucket/update",
    async (data, { rejectWithValue }) => {
        try {
            const { cardId, name } = data;
            const response = await axios.patch(`${URL}/buckets/${cardId}`, {
                name,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteBucket = createAsyncThunk(
    "bucket/delete",
    async (data, { rejectWithValue }) => {
        try {
            const { bucketId } = data;
            const cardRes = await axios.get(`${URL}/cards`);
            const ids = cardRes.data.map((c) => c.id);
            for await (let id of ids) {
                await axios.delete(`${URL}/cards/${id}`);
            }
            await axios.delete(`${URL}/buckets/${bucketId}`);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const createBucket = createAsyncThunk(
    "bucket/create",
    async (data, { rejectWithValue }) => {
        try {
            const { name } = data;
            const res = await axios.post(`${URL}/buckets`, { name });
            return res.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    buckets: [],
    bucketDetails: null,
    isLoading: false,
    error: null,
};

const bucketSlice = createSlice({
    name: "bucket",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchAllBuckets.pending]: (state, action) => {
            state.isLoading = false;
            state.error = null;
        },
        [fetchAllBuckets.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.buckets = action.payload;
        },
        [fetchAllBuckets.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        [fetchBucketDetails.pending]: (state, action) => {
            state.isLoading = false;
            state.error = null;
        },
        [fetchBucketDetails.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.bucketDetails = action.payload;
        },
        [fetchBucketDetails.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export default bucketSlice.reducer;
