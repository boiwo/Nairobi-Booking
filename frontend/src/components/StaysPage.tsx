import React, { useState, useEffect } from 'react';
import { Star, MapPin, X } from 'lucide-react';
import { Stay } from '../types';

interface StaysPageProps {
  onBooking: (booking: any) => void;
  user: any;
  onSignIn: () => void;
}

const StaysPage: React.FC<StaysPageProps> = ({ onBooking, user, onSignIn }) => {
  const [selectedStay, setSelectedStay] = useState<Stay | null>(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [minRating, setMinRating] = useState<number | ''>('');
  const [showSpecialOffers, setShowSpecialOffers] = useState(false);
  const [filteredStays, setFilteredStays] = useState<Stay[]>([]);

  // ✅ Sample stays data (could be fetched dynamically from backend)
  const stays: Stay[] = [
    {
      id: 1,
      name: 'The Norfolk Hotel',
      type: 'hotel',
      price: 13000,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80',
      location: 'Central Nairobi',
      description: 'Historic hotel with beautiful gardens and elegant rooms.',
      amenities: ['WiFi', 'Pool', 'Restaurant'],
      specialOffer: false,
    },
    {
      id: 2,
      name: 'Radisson Blu Nairobi',
      type: 'hotel',
      price: 14000,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
      location: 'Upper Hill',
      description: 'Upscale hotel with panoramic city views and dining options.',
      amenities: ['WiFi', 'Gym', 'Spa'],
      specialOffer: true,
    },
    {
      id: 3,
      name: 'Hilton Nairobi',
      type: 'hotel',
      price: 12500,
      rating: 4.4,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      location: 'City Centre',
      description: 'International hotel chain with premium amenities.',
      amenities: ['WiFi', 'Restaurant', 'Parking'],
      specialOffer: false,
    },
    {
      id: 4,
      name: 'Fairmont The Norfolk',
      type: 'hotel',
      price: 16000,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80',
      location: 'Central Nairobi',
      description: 'Luxury hotel with history and exceptional service.',
      amenities: ['WiFi', 'Pool', 'Bar', 'Spa'],
      specialOffer: true,
    },
    {
      id: 5,
      name: 'Nairobi Serena Hotel',
      type: 'hotel',
      price: 13500,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      location: 'Central Nairobi',
      description: 'Award-winning hotel with elegant rooms and dining.',
      amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant'],
      specialOffer: false,
    },
    {
      id: 6,
      name: 'Nairobi safari  lodge',
      type: 'hotel',
      price: 10500,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=85&w=800',
      location: 'Westlands',
      description: 'Luxurious 5-star hotel with rooftop pool and spa.',
      amenities: ['WiFi', 'Pool','Bar'],
      specialOffer: true,
    },
    {
      id: 7,
      name: 'uhuru park hotel',
      type: 'hotel',
      price: 12500,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170',
      location: 'Westlands',
      description: 'Luxurious 5-star hotel with rooftop pool and spa.',
      amenities: ['WiFi', 'Pool', 'parking', 'Bar'],
      specialOffer: true,
    },
    {
      id: 8,
      name: 'Hilton Garden Inn Nairobi Airport',
      type: 'hotel',
      price: 14500,
      rating: 4.8,
      image: 'https://plus.unsplash.com/premium_photo-1687960116497-0dc41e1808a2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1171',
      location: 'Westlands',
      description: 'Luxurious 5-star hotel with rooftop pool and spa.',
      amenities: ['WiFi', 'Pool', 'Gym', 'Bar'],
      specialOffer: true,
    },
    {
      id: 9,
      name: 'Westwood Apartments Nairobi',
      type: 'hotel',
      price: 15500,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      location: 'Westlands',
      description: 'Luxurious 5-star hotel with rooftop pool and spa.',
      amenities: ['WiFi', 'Pool', 'Gym', 'Bar'],
      specialOffer: true,
    },
  ];

  // ✅ Auto-update filtered stays
  useEffect(() => {
    const results = stays.filter((stay) => {
      const queryMatch =
        stay.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stay.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stay.amenities.some((a) =>
          a.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const priceMatch = maxPrice ? stay.price <= maxPrice : true;
      const ratingMatch = minRating ? stay.rating >= minRating : true;
      const offerMatch = showSpecialOffers ? stay.specialOffer : true;

      return queryMatch && priceMatch && ratingMatch && offerMatch;
    });
    setFilteredStays(results);
  }, [searchQuery, maxPrice, minRating, showSpecialOffers]);

  const displayStays = searchQuery || maxPrice || minRating || showSpecialOffers ? filteredStays : stays;

  // ✅ Booking handler
  const handleBookNow = (stay: Stay) => {
    if (!user) return onSignIn();
    if (!checkIn || !checkOut) return alert('Please select check-in and check-out dates');

    const nights =
      Math.ceil(
        (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
          (1000 * 60 * 60 * 24)
      ) || 1;

    const totalPrice = stay.price * nights;

    const booking = {
      id: Date.now().toString(),
      userId: user.id,
      type: 'stay',
      itemId: stay.id,
      itemName: stay.name,
      checkIn,
      checkOut,
      guests,
      totalPrice,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    onBooking(booking);
    setSelectedStay(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
        Explore Nairobi Stays
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Find your perfect stay — hotels, apartments & suites
      </p>

      {/* ✅ Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8 grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">Search</label>
          <input
            type="text"
            placeholder="e.g. Karen, WiFi, Kempinski..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Max Price (KSh)</label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : '')}
            placeholder="15000"
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Min Rating</label>
          <select
            value={minRating}
            onChange={(e) => setMinRating(e.target.value ? Number(e.target.value) : '')}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Any</option>
            {[3, 4, 4.5, 4.8].map((r) => (
              <option key={r} value={r}>{r}+</option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showSpecialOffers}
            onChange={() => setShowSpecialOffers(!showSpecialOffers)}
          />
          <label className="text-sm">Special Offers</label>
        </div>

        <div className="flex items-end">
          <button
            onClick={() => {
              setSearchQuery('');
              setMaxPrice('');
              setMinRating('');
              setShowSpecialOffers(false);
            }}
            className="w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300"
          >
            Reset
          </button>
        </div>
      </div>

      {/* ✅ Grid */}
      {displayStays.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No stays match your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayStays.map((stay) => (
            <StayCard
              key={stay.id}
              stay={stay}
              onSelect={() => setSelectedStay(stay)}
              onBook={() => handleBookNow(stay)}
              checkIn={checkIn}
              checkOut={checkOut}
            />
          ))}
        </div>
      )}

      {selectedStay && (
        <BookingModal
          stay={selectedStay}
          checkIn={checkIn}
          checkOut={checkOut}
          guests={guests}
          onClose={() => setSelectedStay(null)}
          onBook={() => handleBookNow(selectedStay)}
          user={user}
        />
      )}
    </div>
  );
};

export default StaysPage;

/* ------------------------------------------------------ */
/* ✅ StayCard Component */
interface StayCardProps {
  stay: Stay;
  onSelect: () => void;
  onBook: () => void;
  checkIn: string;
  checkOut: string;
}

const StayCard: React.FC<StayCardProps> = ({ stay, onSelect, onBook }) => (
  <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition">
    <img
      src={stay.image}
      alt={stay.name}
      className="w-full h-56 object-cover cursor-pointer"
      onClick={onSelect}
    />
    <div className="p-4">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-900">{stay.name}</h3>
        <span className="text-yellow-500 flex items-center">
          <Star className="h-4 w-4 mr-1" /> {stay.rating.toFixed(1)}
        </span>
      </div>
      <p className="text-sm text-gray-500 flex items-center mt-1">
        <MapPin className="h-4 w-4 mr-1" /> {stay.location}
      </p>
      <p className="text-gray-600 text-sm mt-2">{stay.description}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {stay.amenities.map((a, i) => (
          <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-md">
            {a}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="text-lg font-bold text-blue-600">KSh {stay.price.toLocaleString()}</span>
        <button
          onClick={onBook}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
        >
          Book Now
        </button>
      </div>
      {stay.specialOffer && (
        <span className="absolute top-4 left-4 bg-red-600 text-white text-xs px-2 py-1 rounded">
          Special Offer
        </span>
      )}
    </div>
  </div>
);

/* ------------------------------------------------------ */
/* ✅ BookingModal Component */
interface BookingModalProps {
  stay: Stay;
  checkIn: string;
  checkOut: string;
  guests: number;
  onClose: () => void;
  onBook: () => void;
  user: any;
}

const BookingModal: React.FC<BookingModalProps> = ({
  stay,
  checkIn,
  checkOut,
  guests,
  onClose,
  onBook,
  user,
}) => {
  const nights =
    checkIn && checkOut
      ? Math.ceil(
          (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 1;
  const total = stay.price * nights;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>

        <img
          src={stay.image}
          alt={stay.name}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h2 className="text-xl font-semibold mb-2">{stay.name}</h2>
        <p className="text-gray-500 mb-4">{stay.location}</p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block text-sm font-medium">Check-In</label>
            <input
              type="date"
              value={checkIn}
              onChange={() => {}}
              className="border rounded-md px-2 py-1 w-full"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Check-Out</label>
            <input
              type="date"
              value={checkOut}
              onChange={() => {}}
              className="border rounded-md px-2 py-1 w-full"
              disabled
            />
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600">
            <strong>Guests:</strong> {guests}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Price per night:</strong> KSh {stay.price.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Total for {nights} night{nights > 1 ? 's' : ''}:</strong>{' '}
            <span className="text-blue-600 font-bold">
              KSh {total.toLocaleString()}
            </span>
          </p>
        </div>

        {user ? (
          <button
            onClick={onBook}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold"
          >
            Confirm Booking
          </button>
        ) : (
          <p className="text-center text-gray-600 text-sm">
            Please sign in to book your stay.
          </p>
        )}
      </div>
    </div>
  );
};

