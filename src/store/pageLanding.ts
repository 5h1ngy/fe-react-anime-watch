import { createSlice } from '@reduxjs/toolkit';

export type History = { label: string, id: string, current: boolean }

export interface State {
    history: History[],
}

const landingSlice = createSlice({
    name: 'page/landing',
    initialState: {
        history: [],
    } as State,
    reducers: {
        updateHistory: (state, action) => {
            state.history = state.history.map(entry => ({ ...entry, current: false }));
            state.history.push({ ...action.payload, current: action.payload?.current || true });
        },
        setHistory: (state, action) => {
            state.history = [action.payload];
        },
        clearHistory: (state) => {
            state.history = [];
        },
    }
});

export const actions = {
    ...landingSlice.actions
};

export default landingSlice.reducer;
