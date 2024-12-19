import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import add_product_icon from '../../assets/add_producticon.png'
import list_product_icon from '../../assets/list_product_icon.png'


const Siderbar = () => {
    return (
        <div className='sidebar'>
            <Link to={'/addproduct'} style={{ textDecoration: "none" }}>
                <div className="sidebar-item">
                    <img src={add_product_icon} alt='' />
                    <p>Add product</p>
                </div>

            </Link>
            <Link to={'/listproduct'} style={{ textDecoration: "none" }}>
                <div className="sidebar-item">
                    <img src={list_product_icon} alt='' />
                    <p>Product list </p>
                </div>

            </Link>

        </div>
    )
}

export default Siderbar