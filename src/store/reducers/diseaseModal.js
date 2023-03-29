import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
    diseaseId: null,
    componentData: null,
    cropId: null,
    desricptionModalIsOpen: false,
    descriptionComponentData: null
};

const diseaseModal = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        storedDiseaseCardData(state, action) {
            state.componentData = action.payload.componentData;
            state.isOpen = action.payload.isOpen
        },
        closeDiseaseModal(state) {
            state.isOpen = false;
            state.componentId = null;
            state.componentData = null;
        },
        openDiseaseModal(state, action) {
            state.isOpen = action.payload.isOpen;
            state.diseaseId = action.payload.diseaseId;
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
            state.diseaseId = action.payload.diseaseId;
        },


    }
});

export const { openDiseaseModal, closeDiseaseModal, storedDiseaseCardData, openDescriptionModal, closeDescriptionModal, storedDescriptionCardData } = diseaseModal.actions;

export default diseaseModal.reducer;