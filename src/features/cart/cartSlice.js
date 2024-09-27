import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import cartItems from "../../cartItems"
import axios from "axios";
import { showModal } from "../modal/modalSlice";

const url = 'https://www.course-api.com/react-useReducer-cart-project';

const initialState= {
    cartItems:[],
    amount:4,
    total:0,
    isLoading:true
};

// export const getCartItems=createAsyncThunk('cart/getCartItems',()=>{
//     return fetch(url).then(resp=>resp.json())
//     .catch(error=>console.log(error)) ;
// });

// export const getCartItems=createAsyncThunk('cart/getCartItems',async ()=>{
//     try {
//         const resp=await axios(url);
//         return resp.data;
//     } catch (error) {
        
//     }
// });

export const getCartItems=createAsyncThunk('cart/getCartItems',async (name,ThunkAPI)=>{
    // just to show you that we can pass parametres to this function
    console.log(name);

    // with that ThunkAPI properties we can access all the states of our app an 
    // dispatch action

    console.log(ThunkAPI);
    console.log(ThunkAPI.getState());
    // ThunkAPI.dispatch(showModal())
    
    try {
        const resp=await axios(url);
        return resp.data;
    } catch (error) {
        // using axios to get the error message that come from the server 
        // return error.response
        ThunkAPI.rejectWithValue('lam tzboto ma3ana')
    }
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
    // extraReducers:{
    //     [getCartItems.pending] :(state)=>{
    //         state.isLoading=true
    //     },
    //     [getCartItems.fulfilled] :(state,action)=>{
    //         state.isLoading=false;
    //         state.cartItems=action.payload;
    //     },
    //     [getCartItems.rejected] :(state,action)=>{
    //         // state.isLoading=false;
    //         console.log(action);
            
    //     },
    // }

    // new syntax in RTK 2.0
    extraReducers:(builder)=>{
        builder.addCase(getCartItems.pending,(state)=>{
            state.isLoading=true
        }).addCase(getCartItems.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.cartItems=action.payload;
        }).addCase(getCartItems.rejected,(state,action)=>{
             state.isLoading=false;
            console.log(action);
        })
    }
});

export const {clearCarts,removeItem,decrease,increase,calculateTotals} =cartSlice.actions;

export default cartSlice.reducer
