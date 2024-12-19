import React, { useContext, useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.jpg';
import cartIcon from '../Assets/cart_icon.jpg';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

export const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const { getTotalCartItems } = useContext(ShopContext); 

    return (
        <div className="navbar">
            <div className="nav-logo">
                <img src={logo} alt="Shopper Logo" />
                <p>SHOPPER</p>
            </div>

            <ul className="nav-menu">
                <li onClick={() => { setMenu("shop") }}>
                    <Link style={{ textDecoration: 'none' }} to='/'>Shop</Link>
                    {menu === "shop" ? <hr /> : <></>}
                </li>
                <li onClick={() => { setMenu("mens") }}>
                    <Link style={{ textDecoration: 'none' }} to='/mens'>Men</Link>
                    {menu === "mens" ? <hr /> : <></>}
                </li>
                <li onClick={() => { setMenu("womans") }}>
                    <Link style={{ textDecoration: 'none' }} to='/womans'>Woman</Link>
                    {menu === "womans" ? <hr /> : <></>}
                </li>
                <li onClick={() => { setMenu("kids") }}>
                    <Link style={{ textDecoration: 'none' }} to='/kids'>Kids</Link>
                    {menu === "kids" ? <hr /> : <></>}
                </li>
            </ul>

            <div className="nav-login-cart">
                <Link to='/Login'><button className="login-btn">Login</button></Link>
                <Link to='/cart'>
                    <div className="cart-icon">
                        <img src={cartIcon} alt="Cart Icon" />
                        <div className="nav-cart-count">{getTotalCartItems()}</div>
                    </div>
                </Link>
            </div>
        </div>
    );
};
