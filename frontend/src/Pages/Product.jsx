import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import Breadcrums from '../Components/Breadcrums/Breadcrums';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProduct from '../Components/RelatedProduct/RelatedProduct';
import data_product from '../Components/Assets/data';


const Product = () => {
  const { data_product } = useContext(ShopContext);
  const { productId } = useParams();

 
  const product = data_product.find((item) => item.id === Number(productId));

  if (!product) {
    return <div>Product not found</div>; // Handle missing product
  }

  return (
    <div>
      <Breadcrums product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox/>
      <RelatedProduct/>
  
    </div>
  );
};

export default Product;
