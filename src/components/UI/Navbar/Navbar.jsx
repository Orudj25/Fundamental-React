import React from 'react';
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <div className='navbar'>
            <div className="navbar__links">
                <Link to='/about'>About Web Site </Link>
                <Link to='/'> Posts</Link>
                <Link to='/login'> Login</Link>
            </div>
        </div>
    );
};

export default Navbar;