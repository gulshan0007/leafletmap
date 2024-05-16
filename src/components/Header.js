import React from 'react';
import './style.css'; // assuming you have the styles in a file named style.css

function Header() {
    return (
        <header>
            <input type="checkbox" name="" id="chk1" />
            <div className="logo"><h1>Mumbai Flood Warning System</h1></div>
            <div className="search-box">
                <form>
                    <input type="text" name="search" id="srch" placeholder="Search" />
                    <button type="submit"><i className="fa fa-search"></i></button>
                </form>
            </div>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Product</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Contact</a></li>
                <li>
                    <a href="#"><i className="fa fa-facebook"></i></a>
                    <a href="#"><i className="fa fa-twitter"></i></a>
                    <a href="#"><i className="fa fa-instagram"></i></a>
                </li>
            </ul>
            <div className="menu">
                <label htmlFor="chk1">
                    <i className="fa fa-bars"></i>
                </label>
            </div>
        </header>
    );
}

export default Header;
