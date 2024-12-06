import { configureStore } from '@reduxjs/toolkit';

import pageLanding from './pageLanding';
import containerNewest from './containerNewest';
import containerDetails from './containerDetails';
import containerMyList from './containerMyList';
import { actions as pageLandingActions } from "./pageLanding"
import { actions as containerNewestActions } from "./containerNewest"
import { actions as containerDetailsActions } from "./containerDetails"
import { actions as containerMyListActions, saveReferencesMiddleware } from "./containerMyList"

export const actions = {
    pageLanding: pageLandingActions,
    containerNewest: containerNewestActions,
    containerDetails: containerDetailsActions,
    containerMyList: containerMyListActions,
}

const reducer = {
    pageLanding,
    containerNewest,
    containerDetails,
    containerMyList,
};

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saveReferencesMiddleware),
});

export type State = ReturnType<typeof store.getState>;

export default store;
