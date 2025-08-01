import { useState } from "react";
import { Link } from "react-router-dom";

const NavbarComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">UNIBOOKSTORE</h1>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        <div className="hidden md:flex space-x-4">
          <Link to="/" className="text-gray-700 hover:text-blue-500">
            Home
          </Link>
          <Link to="/admin" className="text-gray-700 hover:text-blue-500">
            Admin
          </Link>
          <Link to="/pengadaan" className="text-gray-700 hover:text-blue-500">
            Pengadaan
          </Link>
        </div>
      </div>

      {/* Dropdown Menu for Mobile */}
      {isOpen && (
        <div className="md:hidden px-4 pb-3 space-y-2">
          <Link
            to="/"
            className="block text-gray-700 hover:text-blue-500"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/admin"
            className="block text-gray-700 hover:text-blue-500"
            onClick={() => setIsOpen(false)}
          >
            Admin
          </Link>
          <Link
            to="/pengadaan"
            className="block text-gray-700 hover:text-blue-500"
            onClick={() => setIsOpen(false)}
          >
            Pengadaan
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavbarComponent;
