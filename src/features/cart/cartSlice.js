import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import cartItems from "../../cartItems"

const url = 'https://www.course-api.com/react-useReducer-cart-project';

const initialState= {
    cartItems:[],
    amount:4,
    total:0,
    isLoading:true
};

export const getCartItems=createAsyncThunk('cart/getCartItems',()=>{
    return fetch(url).then(resp=>resp.json())
    .catch(error=>console.log(error)) ;
});

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
    },
    extraReducers:{
        [getCartItems.pending] :(state)=>{
            state.isLoading=true
        },
        [getCartItems.fulfilled] :(state,action)=>{
            state.isLoading=false;
            state.cartItems=action.payload;
        },
        [getCartItems.rejected] :(state)=>{
            state.isLoading=false;
        },
    }
});

export const {clearCarts,removeItem,decrease,increase,calculateTotals} =cartSlice.actions;

export default cartSlice.reducer
