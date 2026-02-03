import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    navShow: 'home'
};

const navbarSlice = createSlice({
    name: 'navbarSlice',
    initialState,
    reducers: {
        setNavbar: (state, action) => {
            console.log("state.navshow", state.navShow);
            state.navShow = action.payload;
        }
    }
});

export const { setNavbar } = navbarSlice.actions;
export default navbarSlice.reducer;