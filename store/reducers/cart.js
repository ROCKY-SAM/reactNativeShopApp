import { ADD_TO_CART,REMOVE_FROM_CART } from '../actions/cart';
import CartItem from '../../models/cart-item';
import { ADD_ORDER } from '../actions/order';

const initialState = {
  items: {},
  totalAmount: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;

      let updatedOrNewCartItem;

      if (state.items[addedProduct.id]) {
        // already have the item in the cart
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice
        );
      } else {
        updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + prodPrice
      };
case REMOVE_FROM_CART:
    const seletedCartItem = state.items[action.pid];
    const currentQty = seletedCartItem.quantity;
    let updatedCartItemsObj;
    if(currentQty > 1){
        const updatedCartItems = new CartItem(
            seletedCartItem.quantity - 1,
            seletedCartItem.productPrice,
            seletedCartItem.productTitle,
            seletedCartItem.sum-seletedCartItem.productPrice);
            updatedCartItemsObj = {...state.items,[action.pid]:updatedCartItems};
    }else{
        updatedCartItemsObj ={...state.items};
        delete updatedCartItemsObj[action.pid];
    }

    return {
        ...state,items:updatedCartItemsObj,
        totalAmount:state.totalAmount-seletedCartItem.productPrice
    };
    case ADD_ORDER:
        return initialState;

  }
  return state;
};
