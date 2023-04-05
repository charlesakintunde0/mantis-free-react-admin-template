import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
    weedId: null,
    componentData: null,
    cropId: null,
    desricptionModalIsOpen: false,
    descriptionComponentData: null
};

const pestModal = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        storedPestCardData(state, action) {
            state.componentData = action.payload.componentData;
            state.isOpen = action.payload.isOpen;
            state.pestId = action.payload.pestId;
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
        storedDescriptionCardData(state, action) {
            state.descriptionComponentData = action.payload.descriptionComponentData;
            state.desricptionModalIsOpen = action.payload.desricptionModalIsOpen
        },
        closeDescriptionModal(state) {
            state.desricptionModalIsOpen = false;
            state.componentId = null;
            state.descriptionComponentData = null;
        },
        openDescriptionModal(state, action) {
            state.desricptionModalIsOpen = action.payload.desricptionModalIsOpen;
            state.weedId = action.payload.weedId;
        },
    }
});

export const { openPestModal, closePestModal, storedPestCardData, openDescriptionModal, closeDescriptionModal, storedDescriptionCardData } = pestModal.actions;

export default pestModal.reducer;