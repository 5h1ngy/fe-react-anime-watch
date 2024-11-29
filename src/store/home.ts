import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getNewest } from '@/services/newest';
import { Item } from "@/services/newest.types";

export enum STATUS { IDLE, LOADING, SUCCESS, FAILED }

export interface State {
    occurrences: Array<Item>,
    status: STATUS,
    error: any,
}

export interface Actions {
    doGetNewest: typeof doGetNewest,
}

// Definisci la chiamata asincrona per ottenere i dati dal server
const doGetNewest = createAsyncThunk('home/doGetNewest', async () => await getNewest());

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        occurrences: [],
        status: STATUS.IDLE,
        error: null,
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
                state.occurrences = action.payload.data;
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
