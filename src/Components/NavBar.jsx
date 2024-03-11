import React from 'react'
import { Link } from 'react-router-dom';

function NavBar() {
  return (
      <nav className='nav-bar'>
        <Link to="/">Home </Link>
        <Link to="/articles">Articles</Link>
      </nav>
  );
}

export default NavBar