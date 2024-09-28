import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    cases: [
        { id: 1, name: 'Rohit Adhari', mobileno: '9356446607', picture: 'https://images.pexels.com/photos/2897883/pexels-photo-2897883.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', designation: 'Manager', cordinate: '19.075983, 72.877655' },
        { id: 2, name: 'Dinesh Adhav', mobileno: '9420506896', picture: 'https://images.pexels.com/photos/16771673/pexels-photo-16771673/free-photo-of-itay-verchik-with-suite-smiles.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', designation: 'Software Dev', cordinate: '18.520430, 73.856743' },
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
