import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen mt-[-20vh]">
      <Link to="/articles" className="w-full md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2">
        <header className="bg-gray-100 border-7 border-black shadow-xl p-20 text-black text-center py-10 px-10 rounded-lg hover:text-gray-600 transition-colors duration-300">
          <h2 className="text-2xl font-light mb-4">Welcome to</h2>
          <h1 className="text-6xl font-bold">Nc News!</h1>
        </header>
      </Link>
    </div>
  );
}

export default Header;
