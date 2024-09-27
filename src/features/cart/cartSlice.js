import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../../cartItems"

const initialState= {
    cartItems:cartItems,
    amount:4,
    total:0,
    isLoading:true
};

// Slice represents a piece of the Redux store. 
const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        // Reducer functions
        clearCarts: (state) =>{
            state.cartItems=[] ;
        },
        removeItem:(state,action)=>{
            const itemId=action.payload ;
            state.cartItems=state.cartItems.filter((item)=> item.id !=itemId )
        },
        increase:(state,{payload})=>{
            const cartItem=state.cartItems.find((item) => item.id === payload.id) ;
            cartItem.amount=cartItem.amount +1 ;
        },
        decrease:(state,{payload})=>{
            const cartItem=state.cartItems.find((item) => item.id === payload.id) ;
            cartItem.amount=cartItem.amount - 1 ;
        },
        calculateTotals: (state) => {
            let amount = 0;
            let total = 0;
            state.cartItems.forEach((item) => {
                amount += item.amount;
                total += item.amount * item.price;
            });
            state.amount = amount;
            state.total = total;
        },
    }
});

export const {clearCarts,removeItem,decrease,increase,calculateTotals} =cartSlice.actions;

export default cartSlice.reducer
