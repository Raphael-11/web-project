import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);


const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300+1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const[all_product, setAll_product]= useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());
  useEffect(() => {
    fetch('http://localhost:4000/allproducts')
      .then((response) => response.json())
      .then((data) => setAll_product(data));

    if (localStorage.getItem('auth-token')) {
      fetch('http://localhost:4000/getcart', {
        method: 'POST',
        headers: {
          Accept: 'application/form_data',
          'auth_token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
        body: "", // Empty body if required
      })
        .then((response) => response.json())
        .then((data) => setCartItems(data));
    }
  }, []); // Empty dependency array for a single render

  // Add to cart function
  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));

    if (localStorage.getItem('auth-token')) {
      fetch('http://localhost:4000/addtocart', {
        method: 'POST',
        headers: {
          Accept: 'application/form_data',
          'auth_token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

  // Remove from cart function
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: Math.max(prev[itemId] - 1, 0) }));

    if (localStorage.getItem('auth-token')) {
      fetch('http://localhost:4000/removefromcart', {
        method: 'POST',
        headers: {
          Accept: 'application/form_data',
          'auth_token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

  
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = all_product.find((product) => product.id === Number(item));
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  
  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  // Context value to provide
  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
