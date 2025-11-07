import React, { useState } from 'react';
import { Car, Users, Fuel, Settings } from 'lucide-react';
import { CarRental } from '../types';

interface CarRentalsPageProps {
  onBooking: (booking: any) => void;
  user: any;
  onSignIn: () => void;
}

const CarRentalsPage: React.FC<CarRentalsPageProps> = ({ onBooking, user, onSignIn }) => {
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [location, setLocation] = useState('Nairobi Airport');

  const cars: CarRental[] = [
    {
      id: '1',
      brand: 'Toyota',
      model: 'Corolla',
      type: 'Economy',
      pricePerDay: 35,
      image: 'https://images.unsplash.com/photo-1720545044233-d2ac77fa6030?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074',
      features: ['AC', 'Manual', '5 Seats', 'Fuel Efficient'],
      availability: true
    },
    {
      id: '2',
      brand: 'Nissan',
      model: 'X-Trail',
      type: 'SUV',
      pricePerDay: 65,
      image: 'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: ['AC', 'Automatic', '7 Seats', '4WD'],
      availability: true
    },
    {
      id: '3',
      brand: 'Toyota',
      model: 'Land Cruiser',
      type: 'Premium SUV',
      pricePerDay: 120,
      image: 'https://images.unsplash.com/photo-1650530579355-7ad9d4766043?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170',
      features: ['AC', 'Automatic', '8 Seats', 'Safari Ready'],
      availability: true
    },
    {
      id: '4',
      brand: 'Honda',
      model: 'Civic',
      type: 'Compact',
      pricePerDay: 40,
      image: 'https://images.unsplash.com/photo-1597245789159-f8f7d2e2254a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070',
      features: ['AC', 'Manual', '5 Seats', 'GPS'],
      availability: true
    }
  ];

  const handleBookCar = (car: CarRental) => {
    if (!user) {
      onSignIn();
      return;
    }

    if (!pickupDate || !returnDate) {
      alert('Please select pickup and return dates');
      return;
    }

    const days = Math.ceil((new Date(returnDate).getTime() - new Date(pickupDate).getTime()) / (1000 * 60 * 60 * 24));
    const totalPrice = car.pricePerDay * days;

    const booking = {
      id: Date.now().toString(),
      userId: user.id,
      type: 'car',
      itemId: car.id,
      itemName: `${car.brand} ${car.model}`,
      checkIn: pickupDate,
      checkOut: returnDate,
      totalPrice,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    onBooking(booking);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Car Rentals in Nairobi</h1>
        <p className="text-gray-600">Find the perfect vehicle for your Nairobi adventure</p>
      </div>

      {/* Search Form */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option>Nairobi Airport</option>
              <option>City Center</option>
              <option>Westlands</option>
              <option>Karen</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label>
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-end">
            <button className="w-full bg-blue-700 text-white py-2 rounded-md font-medium hover:bg-blue-800 transition-colors">
              Update Search
            </button>
          </div>
        </div>
      </div>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <CarCard
            key={car.id}
            car={car}
            onBook={() => handleBookCar(car)}
            pickupDate={pickupDate}
            returnDate={returnDate}
          />
        ))}
      </div>
    </div>
  );
};

const CarCard: React.FC<{
  car: CarRental;
  onBook: () => void;
  pickupDate: string;
  returnDate: string;
}> = ({ car, onBook, pickupDate, returnDate }) => {
  const days = pickupDate && returnDate ? 
    Math.ceil((new Date(returnDate).getTime() - new Date(pickupDate).getTime()) / (1000 * 60 * 60 * 24)) : 1;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <img 
        src={car.image} 
        alt={`${car.brand} ${car.model}`}
        className="w-full h-48 object-cover"
      />
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{car.brand} {car.model}</h3>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
              {car.type}
            </span>
          </div>
          <div className="flex items-center">
            <Car className="h-4 w-4 text-blue-600" />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {car.features.map((feature) => (
            <span key={feature} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
              {feature}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <div>
            <span className="text-xl font-bold text-gray-900">${car.pricePerDay}</span>
            <span className="text-gray-600 ml-1">per day</span>
            {days > 1 && (
              <div className="text-sm text-gray-500">
                Total: ${car.pricePerDay * days} for {days} days
              </div>
            )}
          </div>
          <button
            onClick={onBook}
            disabled={!pickupDate || !returnDate}
            className="bg-green-600 text-white px-4 py-2 rounded-md font-medium hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarRentalsPage;

