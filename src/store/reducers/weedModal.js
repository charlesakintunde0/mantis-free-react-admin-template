import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
    weedId: null,
    componentData: null,
    cropId: null,
    desricptionModalIsOpen: false,
    descriptionComponentData: null
};

const weedModal = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        storedWeedCardData(state, action) {
            state.componentData = action.payload.componentData;
            state.isOpen = action.payload.isOpen
        },
        closeWeedModal(state) {
            state.isOpen = false;
            state.componentId = null;
            state.componentData = null;
        },
        openWeedModal(state, action) {
            state.isOpen = action.payload.isOpen;
            state.weedId = action.payload.weedId;
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

export const { openWeedModal, closeWeedModal, storedWeedCardData, openDescriptionModal, closeDescriptionModal, storedDescriptionCardData } = weedModal.actions;

export default weedModal.reducer;