import React from "react";
import {Link} from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} E-commerce. All rights reserved.
        </p>
        <div className="flex justify-center gap-4 mt-2">
          <Link href="/about" className="text-sm hover:underline">
            About Us
          </Link>
          <Link href="/contact" className="text-sm hover:underline">
            Contact Us
          </Link>
          <Link href="/privacy" className="text-sm hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
