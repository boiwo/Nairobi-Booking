import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import StaysPage from './components/StaysPage';
import AttractionsPage from './components/AttractionsPage';
import CarRentalsPage from './components/CarRentalsPage';
import AirportTaxisPage from './components/AirportTaxisPage';
import BookingDetailsPage from './components/BookingDetailsPage';
import AuthModal from './components/AuthModal';
import { User, Booking } from './types';

function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSignIn = (userData: User) => {
    setUser(userData);
    setIsAuthModalOpen(false);
  };

  const handleSignOut = () => {
    setUser(null);
    setCurrentTab('home');
  };

  const handleBooking = (booking: Booking) => {
    setBookings(prev => [...prev, booking]);
    setShowConfirmation(true);
    setCurrentTab('home');
    
    // Auto-hide confirmation after 5 seconds
    setTimeout(() => {
      setShowConfirmation(false);
    }, 5000);
  };

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const renderCurrentPage = () => {
    switch (currentTab) {
      case 'home':
        return (
          <HomePage 
            onTabChange={setCurrentTab}
            showConfirmation={showConfirmation}
            onDismissConfirmation={() => setShowConfirmation(false)}
          />
        );
      case 'stays':
        return (
          <StaysPage 
            onBooking={handleBooking}
            user={user}
            onSignIn={openAuthModal}
          />
        );
      case 'attractions':
        return (
          <AttractionsPage 
            onBooking={handleBooking}
            user={user}
            onSignIn={openAuthModal}
          />
        );
      case 'cars':
        return (
          <CarRentalsPage 
            onBooking={handleBooking}
            user={user}
            onSignIn={openAuthModal}
          />
        );
      case 'taxis':
        return (
          <AirportTaxisPage 
            onBooking={handleBooking}
            user={user}
            onSignIn={openAuthModal}
          />
        );
      case 'bookings':
        return (
          <BookingDetailsPage 
            bookings={bookings}
            user={user}
          />
        );
      default:
        return (
          <HomePage 
            onTabChange={setCurrentTab}
            showConfirmation={showConfirmation}
            onDismissConfirmation={() => setShowConfirmation(false)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        user={user}
        onSignIn={openAuthModal}
        onSignOut={handleSignOut}
        onViewBookings={() => setCurrentTab('bookings')}
        currentTab={currentTab}
        onTabChange={setCurrentTab}
      />
      
      {renderCurrentPage()}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSignIn={handleSignIn}
      />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Booking.com Nairobi</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Your trusted partner for exploring Nairobi and discovering the best of Kenya's capital city.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-3">Services</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Hotel Bookings</li>
                <li>Attraction Tickets</li>
                <li>Car Rentals</li>
                <li>Airport Transfers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Cancellation Policy</li>
                <li>Safety Guidelines</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Nairobi</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>City Guide</li>
                <li>Weather</li>
                <li>Transportation</li>
                <li>Local Events</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 Booking.com Nairobi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;