import { configureStore } from '@reduxjs/toolkit';

import pageLanding from './pageLanding';
import containerNewest from './containerNewest';
import containerDetails from './containerDetails';
import { actions as pageLandingActions } from "./pageLanding"
import { actions as containerNewestActions } from "./containerNewest"
import { actions as containerDetailsActions } from "./containerDetails"

export const actions = {
    pageLanding: pageLandingActions,
    containerNewest: containerNewestActions,
    containerDetails: containerDetailsActions,
}

const reducer = {
    pageLanding,
    containerNewest,
    containerDetails,
};

const store = configureStore({
    reducer,
});

export type State = ReturnType<typeof store.getState>;

export default store;
