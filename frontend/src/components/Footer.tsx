import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-green-600 p-2 rounded-xl">
                <Sprout className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">AgroConnect</span>
            </div>
            <p className="text-gray-400 text-sm">
              Connecting agricultural businesses worldwide. Empowering farmers, suppliers, and buyers to grow together.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-green-500 cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-green-500 cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-green-500 cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-green-500 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-green-500 transition-colors">Home</Link></li>
              <li><Link to="/marketplace" className="text-gray-400 hover:text-green-500 transition-colors">Marketplace</Link></li>
              <li><Link to="/directory" className="text-gray-400 hover:text-green-500 transition-colors">Directory</Link></li>
              <li><Link to="/dashboard" className="text-gray-400 hover:text-green-500 transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-3">
              <li><span className="text-gray-400">Product Listings</span></li>
              <li><span className="text-gray-400">Business Directory</span></li>
              <li><span className="text-gray-400">Supply Chain</span></li>
              <li><span className="text-gray-400">Market Analytics</span></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-green-500" />
                <span className="text-gray-400 text-sm">info@agroconnect.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-green-500" />
                <span className="text-gray-400 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-green-500" />
                <span className="text-gray-400 text-sm">123 Farm Lane, Agriculture City</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 AgroConnect. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;