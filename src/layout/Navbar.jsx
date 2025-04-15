import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const Navbar = ({onCartClick}) => {
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`bg-gray-800 text-white py-4 transition-all duration-300 ${
        isScrolled ? "fixed top-0 left-0 w-full shadow-lg z-50" : "sticky top-0"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          E-commerce
        </Link>
        <button
          onClick={onCartClick}
          className="flex items-center justify-center gap-2 text-lg cursor-pointer"
        >
          <span>Cart</span>
          <span className="bg-red-600 text-white rounded-full px-2 py-1 text-xs">
            {cartCount > 0 ? cartCount : "0"}
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
