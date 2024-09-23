import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id: '',
    name: '',
    email: '',
    role: '',
    auth: false
}

export const userSlice = createSlice ({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            console.log('Dispatching setUser with payload:', action.payload);
            const { _id, name, email, role, auth } = action.payload;
        
            state._id = _id;
            state.name = name; // Ensure this is assigned
            state.email = email;
            state.role = role; // Ensure this is assigned
            state.auth = auth;
        
            // Save to local storage
            localStorage.setItem('user', JSON.stringify(action.payload));
            console.log('Stored user in local storage:', action.payload);
        },        
        resetUser: (state) => {
            state._id = '';
            state.name = '';
            state.email = '';
            state.role = '';
            state.auth = false;

             // Clear from local storage
             localStorage.removeItem('user');
        },
        loadUserFromStorage: (state) => {
            const user = JSON.parse(localStorage.getItem('user'));
            console.log('Loaded user from local storage:', user); // Debug log
            if (user) {
                state._id = user._id || '';
                state.name = user.name || ''; // Ensure this is set correctly
                state.email = user.email || '';
                state.role = user.role || ''; // Ensure this is set correctly
                state.auth = user.auth || false; // Ensure this is set correctly
            }
        },        
    },
})

export const {setUser, resetUser, loadUserFromStorage} = userSlice.actions;

export default userSlice.reducer;