import React, { useContext } from 'react';
import './CartItem.css'

import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/remove_icon.png';
import ShopContextProvider from '../../Context/ShopContext';

const CartItems = () => {
  const { getTotalCartAmount, data_product, cartItems, removeFromCart } = useContext(ShopContext);

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>

      <hr />

      {data_product.map(function (e) {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cartitems-format">
                <img src={e.image} alt={e.name} className="carticon-product-icon" />
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <p className="cartitem-quatity">{cartItems[e.id]}</p>
                <p>${e.new_price * cartItems[e.id]}</p>
                <img
                  src={remove_icon}
                  onClick={() => removeFromCart(e.id)}
                  alt="Remove item"
                  className="remove-icon" />
              </div>
              <hr />
            </div>
          );
        }

      })
      }
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>cart totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>free</p>

            </div>
            <hr />
            <div className="cartitems-total-items">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>


          </div>

          <button>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code entered here</p>
          <div className="cartitem-promobox">
            <input type="text" placeholder='promo code ' />
            <button>submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
