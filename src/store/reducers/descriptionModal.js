import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
    pestId: null,
    componentData: null
};

const descriptionModal = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        storedDescriptionCardData(state, action) {
            state.componentData = action.payload.componentData;
            state.isOpen = action.payload.isOpen
        },
        closeDescriptionModal(state) {
            state.isOpen = false;
            state.componentId = null;
            state.componentData = null;
        },
        openDescriptionModal(state, action) {
            state.isOpen = action.payload.isOpen;
            state.pestId = action.payload.pestId;
        },

    }
});

export const { openDescriptionModal, closeDescriptionModal, storedDescriptionCardData } = descriptionModal.actions;

export default descriptionModal.reducer;