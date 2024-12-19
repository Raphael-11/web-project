import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './ProductDispaly.css'
import star_icon from '../Assets/star-icon.avif';
import star_dull_icon from '../Assets/star-dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';
import data_product from '../Assets/data';


const ProductDisplay = (props) => {
  const { product } = props;
  const {addToCart} = useContext(ShopContext);
  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          {}
          <Link to={`/product/${product.id}`}>
            <img src={product.image} alt={product.name} />
          </Link>
          <Link to={`/product/${product.id}`}>
            <img src={product.image} alt={product.name} />
          </Link>
          <Link to={`/product/${product.id}`}>
            <img src={product.image} alt={product.name} />
          </Link>
          <Link to={`/product/${product.id}`}>
            <img src={product.image} alt={product.name} />
          </Link>
        </div>

        <div className="productdisplay-img">
         
          <Link to={`/product/${product.id}`}>
            <img
              className="productdisplay-main-img"
              src={product.image}
              alt={product.name}
            />
          </Link>
        </div>
      </div>

      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-star">
          <img src={star_icon} alt="star icon" />
          <img src={star_icon} alt="star icon" />
          <img src={star_icon} alt="star icon" />
          <img src={star_icon} alt="star icon" />
          <img src={star_dull_icon} alt="star dull icon" />
          <p>122</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">${product.old_price}</div>
          <div className="productdisplay-right-price-new">${product.new_price}</div>
        </div>
        <div className="productdisplay-right-description">PPPPPPPPPPPP</div>
        <div className="productdisplay-right-size">
          <h1>Select size</h1>
          <div className="productdisplay-right-size">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
        <p className="productdisplat-right-category"><span>category : </span>Woman , T-shirt ,croptop</p>
        <p className="productdisplat-right-category"><span>tags : </span>medrenn , latest </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
