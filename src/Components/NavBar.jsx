import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return  (
    <nav className="bg-transparent text-white flex justify-center py-4">
      <div className="border-2 border-white rounded-md">
        <div className="flex items-center space-x-4 p-2">
          <Link to="/" className="text-lg font-semibold hover:bg-gray-300 hover:text-black transition-colors rounded-md px-2 py-1">Home</Link>
          <Link to="/articles" className="text-lg font-semibold hover:bg-gray-300 hover:text-black transition-colors rounded-md px-2 py-1">Articles</Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
