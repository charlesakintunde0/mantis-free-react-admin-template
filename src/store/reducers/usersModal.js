import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
};

const usersModal = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        closeUserModal(state) {
            state.isOpen = false;
        },
        openUserModal(state) {
            state.isOpen = true;
        },

    }
});

export const { closeUserModal, openUserModal } = usersModal.actions;

export default usersModal.reducer;