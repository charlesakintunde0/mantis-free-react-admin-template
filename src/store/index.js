// third-party
import { configureStore } from '@reduxjs/toolkit';
import { commentApi, cropApi, coordinatesApi, pestApi, userApi, weedApi, cropsPestApi } from '../api';

import menu from './reducers/menu';
import auth from './reducers/auth';
import user from './reducers/user';



// project import


// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

const store = configureStore({
    reducer: {
        [cropApi.reducerPath]: cropApi.reducer,
        [commentApi.reducerPath]: commentApi.reducer,
        [coordinatesApi.reducerPath]: coordinatesApi.reducer,
        [pestApi.reducerPath]: pestApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [weedApi.reducerPath]: weedApi.reducer,
        [cropsPestApi.reducerPath]: cropsPestApi.reducer,
        menu,
        auth,
        user,


    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().
        concat(cropApi.middleware)
        .concat(commentApi.middleware)
        .concat(coordinatesApi.middleware)
        .concat(pestApi.middleware)
        .concat(userApi.middleware)
        .concat(weedApi.middleware)
        .concat(cropsPestApi.middleware)

});

const { dispatch } = store;

export { store, dispatch };
