import { createSlice } from "@reduxjs/toolkit";

const modalSlice=createSlice({
    name:'modal',
    initialState:{
        isOpen:false,
    },
    reducers:{
        showModal:(state)=>{
            state.isOpen=true
        },
        hidModal:(state)=>{
            state.isOpen=false
        }
    }
});

export const {showModal,hidModal} =modalSlice.actions;
export default modalSlice.reducer