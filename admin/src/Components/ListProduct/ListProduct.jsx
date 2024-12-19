import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import cross_icon from '../../assets/cross_icon.png';

const ListProduct = () => {
    const [allproducts, setAllproducts] = useState([]);

    const fetchInfo = async () => {
        try {
            const response = await fetch('http://localhost:4000/allproducts');
            const data = await response.json();
            setAllproducts(data);
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    const removeProduct = async (id) => {
        try {
            await fetch('http://localhost:4000/removeproduct', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });
            fetchInfo(); // Refresh product list after removing a product
        } catch (error) {
            console.error('Error removing product:', error);
        }
    };

    return (
        <div className='listproduct'>
            <h1>ALL PRODUCT LIST</h1>
            <div className="listproduct-format-main">
                <p>Product</p>
                <p>Title</p>
                <p>Old price</p>
                <p>New price</p>
                <p>Category</p>
                <p>Remove</p>
            </div>
            <div className="listproduct-allproduct">
                <hr />
                {allproducts.map((product, index) => (
                    <React.Fragment key={index}>
                        <div className="listproduct-format-main listproduct-format">
                            <img src={product.image} alt='' className='listproduct-product-icon' />
                            <p>{product.name}</p>
                            <p>${product.old_price}</p>
                            <p>${product.new_price}</p>
                            <p>{product.category}</p>
                            <img
                                onClick={() => removeProduct(product.id)}
                                className='listproduct-remove_icon'
                                src={cross_icon}
                                alt='Remove'
                            />
                        </div>
                        <hr />
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default ListProduct;
