const reducer = (state, action) => {
  switch (action.type) {
    case "CLEAR_CART":
      return { ...state, cart: [] };
    case "REMOVE":
      return {
        ...state,
        cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
      };
    default:
      return state;
  }
  //   if (action.type === "CLEAR_CART") {
  //     return { ...state, cart: [] };
  //   }
  //   if(action.type === "REMOVE"){
  //     return {
  //     ...state,
  //     cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
  //   };
  //   }
  //   return state;
};

export default reducer;
