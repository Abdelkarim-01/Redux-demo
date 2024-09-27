import { hidModal} from '../features/modal/modalSlice';
import { useDispatch } from 'react-redux';
import { clearCarts } from "../features/cart/cartSlice";

const Modal = () => {
    const dispatch=useDispatch();
    return (
        <aside className='modal-container'>
          <div className='modal'>
            <h4>Remove all items from your shopping cart?</h4>
            <div className='btn-container'>
              <button onClick={()=>{
                dispatch(clearCarts());
                dispatch(hidModal());
              }}  type='button' className='btn confirm-btn'>
                confirm
              </button>
              <button onClick={()=>dispatch(hidModal())}type='button' className='btn clear-btn'>
                cancel
              </button>
            </div>
          </div>
        </aside>
    )
}

export default Modal