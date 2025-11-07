import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Ticket } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const location = useLocation();
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/news', label: 'News' },
    { path: '/videos', label: 'Videos' },
    { path: '/schedule', label: 'Schedule & Results' },
    { path: '/teams', label: 'Teams' },
    { path: '/event-guide', label: 'Event Guide' },
    { path: '/media-guide', label: 'Media Guide' },
    { path: '/archive', label: 'Archive' },
    { path: '/tickets', label: 'Tickets' },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-700 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-white font-bold text-xl">
            <Ticket className="h-8 w-8" />
            <span>TicketMaster Pro</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'bg-white bg-opacity-20 text-white'
                    : 'text-blue-100 hover:text-white hover:bg-white hover:bg-opacity-10'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Cart Icon */}
          <Link
            to="/cart"
            className="relative flex items-center text-white hover:text-blue-100 transition-colors duration-200"
          >
            <ShoppingCart className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-3">
          <div className="flex flex-wrap gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'bg-white bg-opacity-20 text-white'
                    : 'text-blue-100 hover:text-white hover:bg-white hover:bg-opacity-10'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;