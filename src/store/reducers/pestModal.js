import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
    cropId: null,
    pestId: null,
    componentData: null
};

const pestModal = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        storedPestCardData(state, action) {
            state.componentData = action.payload.componentData;
            state.isOpen = action.payload.isOpen
        },
        closePestModal(state) {
            state.isOpen = false;
            state.componentId = null;
            state.componentData = null;
        },
        openPestModal(state, action) {
            state.isOpen = action.payload.isOpen;
            state.pestId = action.payload.pestId;
            state.cropId = action.payload.cropId;
        },

    }
});

export const { openPestModal, closePestModal, storedPestCardData } = pestModal.actions;

export default pestModal.reducer;