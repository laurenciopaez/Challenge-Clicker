import {createSlice} from '@reduxjs/toolkit';

const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        name: "",
        counter: 0,
        allCounters: [],
    },
    reducers: {
        addUser: (state, action) => {
            state.name = action.payload;
        },
        addAllInfo: (state, action) => {
            if(action.payload.allCounters){
                state.allCounters = action.payload.allCounters;
            }
            state.counter = action.payload.counter;
            state.name = action.payload.username;
        }
    }
})

export const {
    addUser,
    addAllInfo,
} = counterSlice.actions;

export default counterSlice.reducer;