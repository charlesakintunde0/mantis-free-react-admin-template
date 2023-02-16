// third-party
import { configureStore } from '@reduxjs/toolkit';
import { commentApi, cropApi, coordinatesApi, pestApi, userApi, weedApi, cropsPestApi } from '../api';

import menu from './reducers/menu';


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
        menu


    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cropApi.middleware, commentApi.middleware, coordinatesApi.middleware, pestApi.middleware, userApi.middleware, weedApi.middleware, cropsPestApi.middleware),

});

const { dispatch } = store;

export { store, dispatch };
