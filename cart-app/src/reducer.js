const reducer = (state, action) => {
  switch (action.type) {
    case "CLEAR_CART":
      return { ...state, cart: [] };
    case "REMOVE":
      return {
        ...state,
        cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
      };
    case "INCREASE":
      let tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === action.payload) {
          return { ...cartItem, amount: cartItem.amount + 1 };
        }
        return cartItem;
      });
      return { ...state, cart: tempCart };
    default:
      return state;
  }
};

export default reducer;

// CONDITIONAL FUNCTIONS
//   if (action.type === "CLEAR_CART") {
//     return { ...state, cart: [] };
//   }
//   if(action.type === "REMOVE"){
//     return {
//     ...state,
//     cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
//   };
//   }
//   if(action.payload === "INCREASE"){
//     let tempCart = state.cart.map((cartItem) => {
//         if (cartItem.id === action.payload) {
//           return { ...cartItem, amount: cartItem.amount + 1 };
//         }
//         return cartItem
//       });
//       return { ...state, cart: tempCart };
//   }
//   return state;
