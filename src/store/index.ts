import { configureStore } from '@reduxjs/toolkit';

import pageLanding from './pageLanding';
import containerHome from './containerHome';
import { actions as pageLandingActions } from "./pageLanding"
import { actions as containerHomeActions } from "./containerHome"

export const actions = {
    pageLanding: pageLandingActions,
    containerHome: containerHomeActions,
}

const reducer = {
    pageLanding,
    containerHome,
};

const store = configureStore({
    reducer,
});

export type State = ReturnType<typeof store.getState>;

export default store;
