import React, { useState } from 'react';
import { Plane, MapPin, Users, CheckCircle, Clock, Calendar } from 'lucide-react';
import { AirportTaxi } from '../types';

interface AirportTaxisPageProps {
  onBooking: (booking: any) => void;
  user: any;
  onSignIn: () => void;
}

const AirportTaxisPage: React.FC<AirportTaxisPageProps> = ({ onBooking, user, onSignIn }) => {
  const [direction, setDirection] = useState<'to-city' | 'to-airport'>('to-city');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedTaxi, setSelectedTaxi] = useState<AirportTaxi | null>(null);
  const [passengerCount, setPassengerCount] = useState(1);

  const taxis: AirportTaxi[] = [
    {
      id: '1',
      vehicleType: 'Economy Sedan',
      capacity: 8,
      priceToCity: 45,
      priceToAirport: 45,
      image: 'https://images.unsplash.com/photo-1630826362226-a509049bcdbf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1173',
      features: ['AC', 'WiFi', 'Phone Charger']
    },
    {
      id: '2',
      vehicleType: 'Premium SUV',
      capacity: 6,
      priceToCity: 30,
      priceToAirport: 30,
      image: 'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: ['AC', 'WiFi', 'Leather Seats', 'Extra Luggage Space']
    },
    {
      id: '3',
      vehicleType: 'Luxury Van',
      capacity: 4,
      priceToCity: 25,
      priceToAirport: 25,
      image: 'https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1169',
      features: ['AC', 'WiFi', 'Entertainment System', 'Group Travel']
    }
  ];

  const handleBookTaxi = (taxi: AirportTaxi) => {
    if (!user) {
      onSignIn();
      return;
    }

    if (!selectedDate || !selectedTime) {
      alert('Please select date and time for your transfer');
      return;
    }

    const price = direction === 'to-city' ? taxi.priceToCity : taxi.priceToAirport;
    
    const booking = {
      id: Date.now().toString(),
      userId: user.id,
      type: 'taxi',
      itemId: taxi.id,
      itemName: `${taxi.vehicleType} - Airport Transfer`,
      checkIn: `${selectedDate} ${selectedTime}`,
      totalPrice: price,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    onBooking(booking);
    setSelectedTaxi(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Airport Taxis</h1>
        <p className="text-gray-600">Reliable transfers between Nairobi Airport and the city</p>
      </div>

      {/* Transfer Options */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Transfer Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Direction</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="direction"
                  value="to-city"
                  checked={direction === 'to-city'}
                  onChange={(e) => setDirection(e.target.value as 'to-city')}
                  className="mr-2"
                />
                <Plane className="h-4 w-4 mr-1 text-blue-600" />
                Airport to City Center
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="direction"
                  value="to-airport"
                  checked={direction === 'to-airport'}
                  onChange={(e) => setDirection(e.target.value as 'to-airport')}
                  className="mr-2"
                />
                <MapPin className="h-4 w-4 mr-1 text-green-600" />
                City Center to Airport
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Transfer Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Transfer Time</label>
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Passengers</label>
              <select
                value={passengerCount}
                onChange={(e) => setPassengerCount(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                  <option key={num} value={num}>{num} passenger{num > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Taxi Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {taxis.map((taxi) => (
          <TaxiCard
            key={taxi.id}
            taxi={taxi}
            direction={direction}
            onBook={() => setSelectedTaxi(taxi)}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            passengerCount={passengerCount}
          />
        ))}
      </div>

      {/* Booking Confirmation Modal */}
      {selectedTaxi && (
        <TaxiBookingModal
          taxi={selectedTaxi}
          direction={direction}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          passengerCount={passengerCount}
          onClose={() => setSelectedTaxi(null)}
          onConfirm={() => handleBookTaxi(selectedTaxi)}
        />
      )}
    </div>
  );
};

const TaxiCard: React.FC<{
  taxi: AirportTaxi;
  direction: 'to-city' | 'to-airport';
  onBook: () => void;
  selectedDate: string;
  selectedTime: string;
  passengerCount: number;
}> = ({ taxi, direction, onBook, selectedDate, selectedTime, passengerCount }) => {
  const price = direction === 'to-city' ? taxi.priceToCity : taxi.priceToAirport;
  const isCapacityExceeded = passengerCount > taxi.capacity;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <img 
        src={taxi.image} 
        alt={taxi.vehicleType}
        className="w-full h-48 object-cover"
      />
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{taxi.vehicleType}</h3>
            <div className="flex items-center text-gray-600 mt-1">
              <Users className="h-4 w-4 mr-1" />
              <span className="text-sm">Up to {taxi.capacity} passengers</span>
            </div>
          </div>
          <CheckCircle className="h-5 w-5 text-green-500" />
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {taxi.features.map((feature) => (
            <span key={feature} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
              {feature}
            </span>
          ))}
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="text-2xl font-bold text-gray-900">${price}</span>
              <span className="text-gray-600 ml-1">total</span>
            </div>
            <span className="text-sm text-gray-500">
              {direction === 'to-city' ? 'Airport → City' : 'City → Airport'}
            </span>
          </div>
          
          <button
            onClick={onBook}
            disabled={!selectedDate || !selectedTime}
            className={`w-full py-2 rounded-md font-medium transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed ${
              isCapacityExceeded 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-purple-600 hover:bg-purple-700 text-white'
            }`}
          >
            {isCapacityExceeded ? `Exceeds Capacity (${taxi.capacity})` : 'Book Transfer'}
          </button>
          {isCapacityExceeded && (
            <p className="text-xs text-red-600 mt-1 text-center">
              This vehicle can only accommodate {taxi.capacity} passengers
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const TaxiBookingModal: React.FC<{
  taxi: AirportTaxi;
  direction: 'to-city' | 'to-airport';
  selectedDate: string;
  selectedTime: string;
  passengerCount: number;
  onClose: () => void;
  onConfirm: () => void;
}> = ({ taxi, direction, selectedDate, selectedTime, passengerCount, onClose, onConfirm }) => {
  const price = direction === 'to-city' ? taxi.priceToCity : taxi.priceToAirport;
  const isCapacityExceeded = passengerCount > taxi.capacity;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
        
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Confirm Transfer Booking</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3">
                <img 
                  src={taxi.image} 
                  alt={taxi.vehicleType}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{taxi.vehicleType}</h3>
                  <p className="text-sm text-gray-600">Up to {taxi.capacity} passengers</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{selectedDate}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{selectedTime}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{passengerCount} passenger{passengerCount > 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center text-sm">
                  {direction === 'to-city' ? (
                    <>
                      <Plane className="h-4 w-4 mr-2 text-blue-600" />
                      <span>Airport → City Center</span>
                    </>
                  ) : (
                    <>
                      <MapPin className="h-4 w-4 mr-2 text-green-600" />
                      <span>City Center → Airport</span>
                    </>
                  )}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Price:</span>
                  <span className="text-xl font-bold text-gray-900">${price}</span>
                </div>
              </div>
            </div>

            {isCapacityExceeded && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                <p className="text-red-800 text-sm">
                  ⚠️ This vehicle can only accommodate {taxi.capacity} passengers. 
                  Please select a different vehicle or reduce passenger count.
                </p>
              </div>
            )}

            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-md font-medium hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={isCapacityExceeded}
                className="flex-1 bg-purple-600 text-white py-2 rounded-md font-medium hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Confirm & Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirportTaxisPage;