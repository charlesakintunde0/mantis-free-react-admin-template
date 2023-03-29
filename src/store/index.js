// third-party
import { configureStore } from '@reduxjs/toolkit';
import { commentApi, cropApi, coordinatesApi, pestApi, userApi, weedApi, cropsPestApi, diseasesApi, helperApi } from '../api';

import menu from './reducers/menu';
import auth from './reducers/auth';
import user from './reducers/user';
import descriptionModal from './reducers/descriptionModal';
import cropModal from './reducers/cropModal';
import pestModal from './reducers/pestModal';
import usersModal from './reducers/usersModal';
import diseaseModal from './reducers/diseaseModal';
import weedModal from './reducers/weedModal';

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
        [diseasesApi.reducerPath]: diseasesApi.reducer,
        [helperApi.reducerPath]: helperApi.reducer,
        menu,
        auth,
        user,
        descriptionModal,
        cropModal,
        pestModal,
        usersModal,
        diseaseModal,
        weedModal



    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().
        concat(cropApi.middleware)
        .concat(commentApi.middleware)
        .concat(coordinatesApi.middleware)
        .concat(pestApi.middleware)
        .concat(userApi.middleware)
        .concat(weedApi.middleware)
        .concat(cropsPestApi.middleware).
        concat(diseasesApi.middleware).
        concat(helperApi.middleware)

});

const { dispatch } = store;

export { store, dispatch };
