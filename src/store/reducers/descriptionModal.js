import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
    componentId: null,
    componentData: {}
};

const descriptionModal = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        storeComponentData(state, action) {
            state.componentData = action.payload.componentData;
        },
        closeModal(state) {
            state.isOpen = false;
            state.componentId = null;
            state.componentData = {};
        },
        openModal(state, action) {
            state.isOpen = action.payload.isOpen;
        },

    }
});

export const { openModal, closeModal, storeComponentData } = descriptionModal.actions;

export default descriptionModal.reducer;