import { configureStore } from '@reduxjs/toolkit';

import pageLanding from './pageLanding';
import containerHome from './containerHome';
import containerDetails from './containerDetails';
import { actions as pageLandingActions } from "./pageLanding"
import { actions as containerHomeActions } from "./containerHome"
import { actions as containerDetailsActions } from "./containerDetails"

export const actions = {
    pageLanding: pageLandingActions,
    containerHome: containerHomeActions,
    containerDetails: containerDetailsActions,
}

const reducer = {
    pageLanding,
    containerHome,
    containerDetails,
};

const store = configureStore({
    reducer,
});

export type State = ReturnType<typeof store.getState>;

export default store;
