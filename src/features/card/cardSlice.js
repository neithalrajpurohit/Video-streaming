import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "https://wee-meet.eastasia.cloudapp.azure.com";

export const fetchAllCards = createAsyncThunk(
    "card/get",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${URL}/cards?_embed=buckets`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchCardDetails = createAsyncThunk(
    "card/details",
    async (data, { rejectWithValue }) => {
        try {
            const { cardId, bucketId } = data;
            const response = await axios.get(`${URL}/cards/${cardId}`);
            const bucketData = await axios.get(`${URL}/buckets/${bucketId}`);
            return { ...response.data, bucket: bucketData.data };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateCardDetails = createAsyncThunk(
    "card/update",
    async (data, { rejectWithValue }) => {
        try {
            const { cardId, name, bucketId } = data;
            const response = await axios.patch(`${URL}/cards/${cardId}`, {
                name,
                bucketId,
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteCard = createAsyncThunk(
    "card/delete",
    async (data, { rejectWithValue }) => {
        try {
            const { cardId } = data;
            const response = await axios.delete(`${URL}/cards/${cardId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const createCard = createAsyncThunk(
    "card/create",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${URL}/cards`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addToHistory = createAsyncThunk(
    "history/add",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${URL}/histories`, data);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchAllHistories = createAsyncThunk(
    "history/get",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${URL}/histories`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    cards: [],
    cardDetails: null,
    isLoading: false,
    error: null,
    histories: [],
};

const cardSlice = createSlice({
    name: "card",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchAllCards.pending]: (state, action) => {
            state.isLoading = false;
            state.error = null;
        },
        [fetchAllCards.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.cards = action.payload;
        },
        [fetchAllCards.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        [fetchCardDetails.pending]: (state, action) => {
            state.isLoading = false;
            state.error = null;
        },
        [fetchCardDetails.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.cardDetails = action.payload;
        },
        [fetchCardDetails.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        [fetchAllHistories.pending]: (state, action) => {
            state.isLoading = false;
            state.error = null;
        },
        [fetchAllHistories.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.histories = action.payload;
        },
        [fetchAllHistories.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export default cardSlice.reducer;
