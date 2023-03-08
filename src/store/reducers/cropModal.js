import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
    cropId: null,
    componentData: null
};

const cropModal = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        storedCropCardData(state, action) {
            state.componentData = action.payload.componentData;
            state.isOpen = action.payload.isOpen
        },
        closeCropModal(state) {
            state.isOpen = false;
            state.componentId = null;
            state.componentData = null;
        },
        openCropModal(state, action) {
            state.isOpen = action.payload.isOpen;
            state.cropId = action.payload.pestId;
        },

    }
});

export const { openCropModal, closeCropModal, storedCropCardData } = cropModal.actions;

export default cropModal.reducer;