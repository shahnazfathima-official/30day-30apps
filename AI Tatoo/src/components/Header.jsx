import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className=" border rounded border-white backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 py-6 flex  items-center justify-between">
        <div className="font-extrabold text-xl text-white ">
         <Link to="/">
          Tattoo <span className="text-indigo-600">Studio</span>
         </Link>
        </div>
        <div className="text-gray-300 text-sm ">By Shanu 😊</div>
      </div>
    </header>
  );
};

export default Header;
