import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getNewest } from '@/services/newest';
import { Item } from "@/services/newest.types";

export enum STATUS { IDLE, LOADING, SUCCESS, FAILED }

export interface State {
    occurrences: Array<Item>,
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    types: string[];
    status: STATUS,
    error: any,
}

export interface Actions {
    doGetNewest: typeof doGetNewest,
}

// Definisci la chiamata asincrona per ottenere i dati dal server
const doGetNewest = createAsyncThunk(
    'container/home/doGetNewest',
    async (payload: { page: number, limit: number }) => {
        return await getNewest(payload);
    }
);

const homeSlice = createSlice({
    name: 'container/home',
    initialState: {
        status: STATUS.IDLE,
        error: null,
        occurrences: [],
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
        types: [],
    } as State,
    reducers: {
        // addItem: (state, action) => {
        //     state.occurrences.push(action.payload);
        // },
        // removeItem: (state, action) => {
        //     state.occurrences = state.occurrences.filter(item => item.id !== action.payload.id);
        // },
        // updateItem: (state, action) => {
        //     const index = state.occurrences.findIndex(item => item.id === action.payload.id);
        //     if (index !== -1) {
        //         state.occurrences[index] = action.payload;
        //     }
        // },
        // clearItems: (state) => {
        //     state.occurrences = [];
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(doGetNewest.pending, (state) => {
                state.status = STATUS.LOADING;
            })
            .addCase(doGetNewest.fulfilled, (state, action) => {
                state.status = STATUS.SUCCESS;

                state.occurrences = action.payload.occurrences;
                state.page = action.payload.page;
                state.limit = action.payload.limit;
                state.total = action.payload.total;
                state.totalPages = action.payload.totalPages;
                state.types = action.payload.types;
            })
            .addCase(doGetNewest.rejected, (state, action) => {
                state.status = STATUS.FAILED;
                state.error = action.error.message;
            });
    },
});

export const actions = {
    ...homeSlice.actions,
    doGetNewest,
};

export default homeSlice.reducer;
