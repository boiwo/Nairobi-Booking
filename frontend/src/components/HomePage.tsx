import React, { useState } from 'react';
import { Search, MapPin, Star, TrendingUp } from 'lucide-react';

interface HomePageProps {
  onTabChange: (tab: string) => void;
  showConfirmation: boolean;
  onDismissConfirmation: () => void;
}

const HomePage: React.FC<HomePageProps> = ({
  onTabChange,
  showConfirmation,
  onDismissConfirmation,
}) => {
  // ✅ State for search fields
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  // ✅ Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!destination.trim()) {
      alert('Please enter a destination or keyword to search.');
      return;
    }

    if (checkIn && checkOut && new Date(checkIn) > new Date(checkOut)) {
      alert('Check-out date must be after check-in date.');
      return;
    }

    // ✅ Smart keyword detection
    const query = destination.toLowerCase();
    if (query.includes('stay') || query.includes('hotel') || query.includes('room')) {
      onTabChange('stays');
    } else if (query.includes('car') || query.includes('rent')) {
      onTabChange('cars');
    } else if (query.includes('taxi') || query.includes('airport')) {
      onTabChange('taxis');
    } else if (query.includes('tour') || query.includes('wildlife')) {
      onTabChange('tours');
    } else if (query.includes('culture') || query.includes('art')) {
      onTabChange('culture');
    } else if (query.includes('food') || query.includes('restaurant') || query.includes('dining')) {
      onTabChange('dining');
    } else if (query.includes('event') || query.includes('nightlife') || query.includes('party')) {
      onTabChange('events');
    } else if (query.includes('attraction') || query.includes('museum') || query.includes('park')) {
      onTabChange('attractions');
    } else {
      // Default fallback
      onTabChange('stays');
    }

    console.log('Search triggered:', { destination, checkIn, checkOut });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ Confirmation Banner */}
      {showConfirmation && (
        <div className="bg-green-600 text-white p-4 text-center relative">
          <div className="flex items-center justify-center space-x-2">
            <div className="h-6 w-6 bg-white rounded-full flex items-center justify-center">
              <span className="text-green-600 text-sm font-bold">✓</span>
            </div>
            <span className="font-medium">
              Booking Confirmed! You have successfully paid for your reservation.
            </span>
          </div>
          <button
            onClick={onDismissConfirmation}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-200"
          >
            ×
          </button>
        </div>
      )}

      {/* ✅ Hero Section */}
      <div
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl font-bold mb-4">Discover Nairobi</h1>
            <p className="text-xl mb-8">Experience the vibrant capital of Kenya</p>
            <div className="flex items-center justify-center space-x-2 text-lg">
              <MapPin className="h-6 w-6" />
              <span>Nairobi, Kenya</span>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Search Bar */}
      <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <form
            onSubmit={handleSearch}
            className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4"
          >
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Where are you going?
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search hotels, tours, dining, etc."
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Check-in
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Check-out
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="bg-blue-700 text-white px-8 py-2 rounded-md font-medium hover:bg-blue-800 transition-colors"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ✅ Services Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Explore Nairobi with Our Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} onClick={() => onTabChange(service.tab)} />
          ))}
        </div>
      </div>

      {/* ✅ Nairobi Highlights */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Visit Nairobi?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <HighlightCard
              icon={<Star className="h-8 w-8 text-yellow-500" />}
              title="Rich Culture"
              description="Experience the vibrant mix of traditional and modern Kenyan culture in the heart of East Africa."
            />
            <HighlightCard
              icon={<MapPin className="h-8 w-8 text-red-500" />}
              title="Safari Gateway"
              description="Perfect starting point for world-famous safari adventures to Maasai Mara and Amboseli."
            />
            <HighlightCard
              icon={<TrendingUp className="h-8 w-8 text-blue-500" />}
              title="Business Hub"
              description="Kenya's economic capital with modern amenities, shopping, and excellent dining options."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ Services List
const services = [
  { title: 'Stays', description: 'Find perfect accommodations', image: 'https://images.unsplash.com/photo-1560347876-aeef00ee58a1?auto=format&fit=crop&q=85&w=800', gradient: 'from-blue-600 to-blue-800', tab: 'stays' },
  { title: 'Attractions', description: 'Discover amazing places', image: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&q=100&w=1600', gradient: 'from-orange-600 to-red-600', tab: 'attractions' },
  { title: 'Car Rentals', description: 'Rent the perfect vehicle', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=100&w=1600', gradient: 'from-green-600 to-teal-600', tab: 'cars' },
  { title: 'Airport Taxis', description: 'Easy airport transfers', image: 'https://images.unsplash.com/photo-1630826362226-a509049bcdbf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1173', gradient: 'from-purple-600 to-indigo-600', tab: 'taxis' },
  { title: 'Wildlife Tours', description: 'Experience Kenya’s nature and wildlife up close', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=100&w=1600', gradient: 'from-yellow-600 to-orange-600', tab: 'tours' },
  { title: 'Cultural Experiences', description: 'Immerse yourself in Kenya’s traditions and art', image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&q=100&w=1600', gradient: 'from-pink-600 to-rose-600', tab: 'culture' },
  { title: 'Dining & Cuisine', description: 'Taste Nairobi’s best restaurants and local dishes', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=100&w=1600', gradient: 'from-red-600 to-orange-600', tab: 'dining' },
  { title: 'Events & Nightlife', description: 'Discover Nairobi’s vibrant nightlife and live events', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=100&w=1600', gradient: 'from-indigo-600 to-purple-600', tab: 'events' },
];

// ✅ Reusable ServiceCard
const ServiceCard: React.FC<{ title: string; description: string; image: string; onClick: () => void; gradient: string }> = ({
  title,
  description,
  image,
  onClick,
  gradient,
}) => (
  <div
    className="relative group cursor-pointer transform hover:scale-105 transition-all duration-300"
    onClick={onClick}
  >
    <div className="h-64 rounded-lg overflow-hidden shadow-lg">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div
        className={`absolute inset-0 bg-gradient-to-t ${gradient} opacity-60 group-hover:opacity-70 transition-opacity`}
      ></div>
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm opacity-90">{description}</p>
      </div>
    </div>
  </div>
);

// ✅ HighlightCard
const HighlightCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({
  icon,
  title,
  description,
}) => (
  <div className="text-center p-6">
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

export default HomePage;
