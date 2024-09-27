import Navbar from "./Component/Navbar";
import CartContainer from "./Component/CartContainer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { calculateTotals } from "./features/cart/cartSlice";
import { useEffect } from "react";
import Modal from "./Component/Modal";

function App() {
  const dispatch = useDispatch();
  const {cartItems}=useSelector((store)=>store.cart) ;
  const { isOpen }=useSelector((store)=>store.modal) ;

  useEffect(()=>{
    dispatch(calculateTotals()) ;
  },[cartItems]);

  return(
    <main>
      {isOpen?<Modal />:""}
      <Navbar />
      <CartContainer />
    </main>
  ) 
}

export default App;
