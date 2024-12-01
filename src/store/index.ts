import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import pageLanding from './pageLanding';
import containerHome from './containerHome';
import containerDetails from './containerDetails';
import { actions as pageLandingActions } from "./pageLanding"
import { actions as containerHomeActions } from "./containerHome"
import { actions as containerDetailsActions } from "./containerDetails"

// const persistConfig = {
//     key: "root",
//     storage,
// };

// const persistedReducer = persistReducer(persistConfig, userReducer);
// export const store = configureStore({
//     reducer: persistedReducer,
//     devTools: process.env.NODE_ENV !== "production",
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             serializableCheck: {
//                 ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
//             },
//         }),
// });

// export const persistor = persistStore(store);

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
