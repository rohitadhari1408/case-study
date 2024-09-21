import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    cases: [
        { id: 1, name: 'John Doe', mobileno: '1234567890', picture: 'http://dummyimage.com/217x100.png/5fa2dd/ffffff', designation: 'Manager', cordinate: '19.075983, 72.877655' },
        { id: 2, name: 'Jane Smith', mobileno: '0987654321', picture: 'http://dummyimage.com/149x100.png/cc0000/ffffff', designation: 'Software Dev', cordinate: '18.520430, 73.856743' },
    ],
};

export const caseslice = createSlice({
    name: 'Newcase',
    initialState,
    reducers: {
        addcase: (state, action) => {
            const newCase = {
                id: nanoid(), // Generate a unique ID for new case
                name: action.payload.name,
                mobileno: action.payload.mobileno,
                picture: action.payload.picture || 'https://via.placeholder.com/100', // Default picture if not provided
                designation: action.payload.designation,
                cordinate: action.payload.cordinate,
            };
            state.cases.push(newCase); // Add new case to the list
        },
        removecase: (state, action) => {
            state.cases = state.cases.filter((existingCase) => existingCase.id !== action.payload); // Remove case by ID
        },
        updatecase: (state, action) => {
            const { id, updatedData } = action.payload;
            const existingCase = state.cases.find((c) => c.id === id);
            if (existingCase) {
                Object.assign(existingCase, updatedData); // Update the case with new data
            }
        },
    },
});

export const { addcase, removecase, updatecase } = caseslice.actions;
export default caseslice.reducer;
