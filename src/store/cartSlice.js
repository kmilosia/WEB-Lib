import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || []
  const totalPrice = calculateTotalPrice(cart)
  const quantity = calculateTotalQuantity(cart)
  return {
    cart,
    totalPrice,
    quantity,
  }
}

const calculateTotalPrice = (cart) => {
  return cart.reduce((total, item) => {
    const priceToUse = item.discountedBruttoPrice !== 0 ? item.discountedBruttoPrice : item.price;
    return total + item.quantity * priceToUse;
  }, 0);
}
const calculateTotalQuantity = (cart) => {
  return cart.reduce((total, item) => total + item.quantity, 0)
}

export const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartFromLocalStorage(),
  reducers: {
    addToCart: (state, action) => {
      const cartItem = state.cart.find((item) => item.id === action.payload.id)
      if(cartItem) {
        cartItem.quantity++
      }else {
        state.cart.push({ ...action.payload, quantity: 1 })
      }
      state.totalPrice = calculateTotalPrice(state.cart)
      state.quantity = calculateTotalQuantity(state.cart)
      localStorage.setItem("cart", JSON.stringify(state.cart))
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload.id)
      item.quantity++
      state.totalPrice = calculateTotalPrice(state.cart)
      localStorage.setItem("cart", JSON.stringify(state.cart))
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload.id)
      if(item.quantity === 1) {
        item.quantity = 1
      }else {
        item.quantity--
        state.totalPrice = calculateTotalPrice(state.cart)
      }
      state.quantity = calculateTotalQuantity(state.cart)
      localStorage.setItem("cart", JSON.stringify(state.cart))
    },
    removeItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id)
      state.quantity = calculateTotalQuantity(state.cart)
      state.totalPrice = calculateTotalPrice(state.cart)
      localStorage.setItem("cart", JSON.stringify(state.cart))
    },
    emptyCart: (state, action) => {
      state.cart = []
      state.totalPrice = null
      state.quantity = null
      state.discountCode = null
      localStorage.removeItem("cart")
    },
  },
})

const { actions } = cartSlice
const { addToCart, incrementQuantity, decrementQuantity, removeItem, emptyCart } = actions

const subscribeToStore = (store) => {
  store.subscribe(() => {
    const state = store.getState().cart
    localStorage.setItem("cart", JSON.stringify(state.cart))
  })
}

export { addToCart, incrementQuantity, decrementQuantity, removeItem, emptyCart, subscribeToStore };
export default cartSlice.reducer;
