// Navbar.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { FaShoppingCart } from 'react-icons/fa';
import './Navbar.css';
import logoImg from '../../images/logo.png';
import { useGlobalContext } from '../../context.'; // Import the useGlobalContext hook

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { cart } = useGlobalContext(); // Use the useGlobalContext hook to access the cart state

  useEffect(() => {
    // You can use the cart state to trigger a re-render when the cart is updated
  }, [cart]);

  return (
    <nav className="navbar" id="navbar">
      <div className="container navbar-content flex">
        <div className="brand-and-toggler flex flex-sb">
          <Link to="/" className="navbar-brand flex">
            <img src={logoImg} alt="site logo" />
            <span className="fw-7 fs-24 ls-1">BOOKstore</span>
          </Link>

          <button
            type="button"
            className="navbar-toggler-btn"
            onClick={() => setToggleMenu(!toggleMenu)}
          >
            <HiOutlineMenuAlt3
              size={35}
              style={{
                color: `${toggleMenu ? '#fff' : '#010101'}`,
              }}
            />
          </button>
        </div>

        <div
          className={
            toggleMenu
              ? 'navbar-collapse show-navbar-collapse'
              : 'navbar-collapse'
          }
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                to="/"
                className="nav-link text-uppercase text-white fs-22 fw-6 ls-1"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/about"
                className="nav-link text-uppercase text-white fs-22 fw-6 ls-1"
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/cart" className="nav-link">
                <div className="cart-icon-container">
                  <FaShoppingCart size={24} className="cart-icon" />
                  {cart.length > 0 && (
                    <span className="cart-badge">{cart.length}</span>
                  )}
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
