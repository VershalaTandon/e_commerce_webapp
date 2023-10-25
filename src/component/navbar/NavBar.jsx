import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, EjectSimple, UserCircle, House } from "phosphor-react";
import "./NavBar.css";
import string from "../../constants/string";

export const Navbar = () => {
  return (
    <div className='navbar navbarBackground'>
      <div className='appTitle'>
        <EjectSimple size={25} />
        <p>
          <b>{string.AppName}</b>
        </p>
      </div>

      <div className='navbar navlinksContent'>
        <div className='links'>
          <Link to='/'>
            <House size={20} />
          </Link>
          <Link to='/userLogin'>
            <UserCircle size={20} />
          </Link>
          <Link to='/cart'>
            <ShoppingCart size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};
