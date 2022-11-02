import { createContext, useReducer, useContext } from "react";
import orderReducer, { initialState } from "./orderReducer";
import {ADD_TO_CART, REMOVE_FROM_CART, UPDATE_PRICE } from './orderTypes';

const OrderContext = createContext(initialState);

export const ShopProvider = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  const addToCart = (product) => {
    const updatedCart = state.products.concat(product);
    updatePrice(updatedCart);
    dispatch({
      type: ADD_TO_CART,
      payload: {
        products: updatedCart
      }
    });
  };

  const removeFromCart = (product) => {
    const updatedCart = state.products.filter(
      (currentProduct) => currentProduct.name !== product.name
    );
    updatePrice(updatedCart);
    dispatch({
      type: REMOVE_FROM_CART,
      payload: {
        products: updatedCart
      }
    });
  };

  const updatePrice = (products) => {
    let total = 0;
    products.forEach((product) => (total += product.price));

    dispatch({
      type: UPDATE_PRICE,
      payload: {
        total
      }
    });
  };

  const value = {
    total: state.total,
    products: state.products,
    addToCart,
    removeFromCart
  };
  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

const useOrder = () => {
  const context = useContext(OrderContext);

  if (context === undefined) {
    throw new Error("useOrder must be used within OrderContext");
  }

  return context;
};

export default useOrder;
