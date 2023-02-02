import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  count: 0,
  addItemToCart: () => {},
  deleteCartItem: () => {},
  increaseCartCount: () => {},
  decreaseCartCount: () => {},
})

export default CartContext
