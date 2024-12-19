import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.png';

const AddProduct = () => {
    const [image, setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "woman",
        new_price: "",
        old_price: ""
    });

    
    const imageHandler = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
            setProductDetails({ ...productDetails, image: e.target.files[0] });
        }
    };

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    
    const Add_Product = async () => {
        console.log("Product Details:", productDetails);
        let responseData;
        let product = productDetails;

        let formData = new FormData();
        formData.append('product', image);

        await fetch('http://localhost:4000/upload',{
            method:'Post',
            header:{
                Accept: 'application/json',
            },
            body:formData,

        }).then((resp) => resp.json()).then((data) => {responseData=data});
        if(responseData.success)
        {
            product.image = responseData.image_url;
            console.log(product)
            await fetch('http://localhost:4000/addproduct',{
            method:'POST',
            headers:{
                Accept:'application',
            'content-Type': 'application/json',

            },
            body:JSON.stringfy(product),
            }).then((resp)=>resp.json()).then((data)=>{
                data.seucces?alert("Product Added"):alert("Failed")
            })

            
        }
    };

    return (
        <div className='addproduct'>
           
            <div className="addproduct-itemfield">
                <p>Product Title</p>
                <input 
                    value={productDetails.name} 
                    onChange={changeHandler} 
                    type='text' 
                    name='name' 
                    placeholder='type here' 
                />
            </div>

            
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input 
                        value={productDetails.old_price} 
                        onChange={changeHandler} 
                        type='text' 
                        name='old_price' 
                        placeholder='type here' 
                    />
                </div>
                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input 
                        value={productDetails.new_price} 
                        onChange={changeHandler} 
                        type='text' 
                        name='new_price' 
                        placeholder='type here' 
                    />
                </div>
            </div>

           
            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select 
                    value={productDetails.category} 
                    onChange={changeHandler} 
                    name='category' 
                    className='add-product-selector'
                >
                    <option value='woman'>Woman</option>
                    <option value='men'>Men</option>
                    <option value='kid'>Kid</option>
                </select>
            </div>

          
            <div className="addproduct-itemfield">
                <label htmlFor='file-input'>
                    <img 
                        src={image ? URL.createObjectURL(image) : upload_area} 
                        className='addproduct-thumnail-img' 
                        alt='Thumbnail Upload'
                    />
                </label>
                <input 
                    onChange={imageHandler} 
                    type="file" 
                    name="image" 
                    id='file-input' 
                    hidden 
                />
            </div>

            
            <button 
                onClick={Add_Product} 
                className='add-product-btn'
            >
                ADD
            </button>
        </div>
    );
};

export default AddProduct;
