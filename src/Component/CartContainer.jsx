import CartItem from "./CartItem"
import { useSelector ,useDispatch} from "react-redux"

import { showModal } from "../features/modal/modalSlice";

const CartContainer = () => {
    const { cartItems, amount, total}=useSelector((store)=>store.cart) ;
    const { isOpen }=useSelector((store)=>store.modal) ;
    const dispatch = useDispatch();
    
    
  if(amount<1){
    return <section className="cart">
        <header>
            <h2>you bag</h2>
            <h4 className="empty-cart">is currently empty</h4>
        </header>
    </section>
  }
    return (
    <section className="cart">
        <header>
            <h2>your bag</h2>
        </header>
        <div>
            {
                cartItems.map((item)=>{
                    return <CartItem key={item.id} {...item} />
                })
            }
        </div>
        <footer>
            <hr />
            <div className="cart-total">  
                <h4>
                    Total <span>${total.toFixed(2)}</span>
                </h4>
            </div>
            <button className="btn clear-btn" onClick={()=>dispatch(showModal())}>clear cart</button>
        </footer>
    </section>
  )
}

export default CartContainer