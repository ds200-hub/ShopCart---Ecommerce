import React, { useContext, useState } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { IoSearch } from "react-icons/io5";
import { FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { VscAccount } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { searchContext } from "../../context/searchContext";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {search, setSearch, searchBtnClick, setSearchBtnClick} = useContext(searchContext);

  const handleInput = (e) => {
    setSearch(e.target.value);
  }
  const handleClick = () => {
    if(searchBtnClick == true){
      setSearchBtnClick(false);
    }
    else{
      setSearchBtnClick(true);
    }
  }

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">

        {/* Brand Logo */}
        <Link to="/" className="flex items-center text-2xl sm:text-3xl font-medium shrink-0">
          <HiOutlineShoppingBag className="text-3xl sm:text-4xl text-amber-500 mr-1" />
          <span>Shop</span>
          <span className="text-amber-500">Cart</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-lg font-medium">
          <Link
            to='/'
            className="hover:text-amber-500 transition-colors duration-100 ease-in-out"
          >
            Home
          </Link>
          <Link
            to="ProductListing"
            className="hover:text-amber-500 transition-colors duration-100 ease-in-out"
          >
            Products
          </Link>
        </div>

        {/* Search Bar (Desktop) */}
        <div className="hidden sm:flex relative flex-1 max-w-xs md:max-w-md">
          <input
            onChange={handleInput}
            type="text"
            placeholder="Search products..."
            className="w-full h-10 rounded-lg border border-gray-300 bg-white pl-4 pr-10 text-sm outline-none hover:border-amber-500 transition-colors"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-600 hover:text-amber-500 transition-colors cursor-pointer" onClick={handleClick}>
            <IoSearch />
          </button>
        </div>

        {/* Right Action Icons & Mobile Toggle */}
        <div className="flex items-center gap-5 text-2xl">
          <Link
            to="/Cart"
            className="hover:text-amber-500 transition-colors duration-100 ease-in-out"
          >
            <FiShoppingCart />
          </Link>

          <Link
            to="/Account"
            className="hover:text-amber-500 transition-colors duration-100 ease-in-out"
          >
            <VscAccount />
          </Link>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-2xl text-gray-700 hover:text-amber-500 transition-colors focus:outline-none"
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-3 pb-5 space-y-4 shadow-lg">
          {/* Mobile Search Bar */}
          <div className="relative w-full sm:hidden">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full h-10 rounded-lg border border-gray-300 bg-white pl-4 pr-10 text-sm outline-none focus:border-amber-500"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-600 hover:text-amber-500">
              <IoSearch />
            </button>
          </div>

          {/* Mobile Links */}
          <div className="flex flex-col gap-3 font-medium text-lg">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-amber-500 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/ProductListing"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-amber-500 transition-colors"
            >
              Products
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;