import React from 'react';
import { User, LogOut, Menu } from 'lucide-react';

interface HeaderProps {
  user: any;
  onSignIn: () => void;
  onSignOut: () => void;
  onViewBookings: () => void;
  currentTab: string;
  onTabChange: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  user, 
  onSignIn, 
  onSignOut, 
  onViewBookings, 
  currentTab, 
  onTabChange 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'stays', label: 'Stays' },
    { id: 'attractions', label: 'Attractions' },
    { id: 'cars', label: 'Car Rentals' },
    { id: 'taxis', label: 'Airport Taxis' },
  ];

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => onTabChange('home')}
          >
            <h1 className="text-2xl font-bold text-blue-700">Booking</h1>
            <span className="text-2xl font-bold text-orange-600">.com</span>
            <span className="ml-2 text-sm text-gray-600">Nairobi</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentTab === tab.id
                    ? 'text-blue-700 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-700 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <button
                  onClick={onViewBookings}
                  className="text-sm text-blue-700 hover:text-blue-800 font-medium"
                >
                  My Bookings
                </button>
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="text-sm text-gray-700">{user.name}</span>
                  <button
                    onClick={onSignOut}
                    className="p-1 text-gray-600 hover:text-gray-800"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={onSignIn}
                className="bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-800 transition-colors"
              >
                Sign In
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-800"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    onTabChange(tab.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentTab === tab.id
                      ? 'text-blue-700 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-700 hover:bg-gray-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;