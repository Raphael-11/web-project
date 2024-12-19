import React, { useContext } from 'react';
import './CSS/ShopCategory.css';
import Popular from '../Components/Popular/Popular';
import Item from '../Components/Item/Item';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import data_product from '../Components/Assets/data';

const ShopCategory = ({ category }) => {
  const { data_product } = useContext(ShopContext);

  const filteredProducts = data_product.filter((item) => item.category === category);

  return (
    <div className="shop-category">
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span>out of 512
        </p>
      </div>
      <div className="shopcategory-sort">
        sort by <img src={dropdown_icon} alt='' />
      </div>
      <hr />
      <div className="popular-item">
        {data_product.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>




    </div>
  );
};

export default ShopCategory