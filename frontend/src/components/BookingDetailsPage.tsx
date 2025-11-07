import React from 'react';
import { Calendar, MapPin, Users, Car, Star, Clock } from 'lucide-react';
import { Booking } from '../types';

interface BookingDetailsPageProps {
  bookings: Booking[];
  user: any;
}

const BookingDetailsPage: React.FC<BookingDetailsPageProps> = ({ bookings, user }) => {
  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">Sign In Required</h1>
          <p className="text-gray-600">Please sign in to view your bookings.</p>
        </div>
      </div>
    );
  }

  const userBookings = bookings.filter(booking => booking.userId === user.id);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
        <p className="text-gray-600">Manage your reservations and travel plans</p>
      </div>

      {userBookings.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Bookings Yet</h2>
          <p className="text-gray-600">Your bookings will appear here once you make a reservation.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {userBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
};

const BookingCard: React.FC<{ booking: Booking }> = ({ booking }) => {
  const getIcon = () => {
    switch (booking.type) {
      case 'stay': return <MapPin className="h-5 w-5 text-blue-600" />;
      case 'attraction': return <Star className="h-5 w-5 text-orange-600" />;
      case 'car': return <Car className="h-5 w-5 text-green-600" />;
      case 'taxi': return <Clock className="h-5 w-5 text-purple-600" />;
      default: return null;
    }
  };

  const getStatusColor = () => {
    switch (booking.status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {getIcon()}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{booking.itemName}</h3>
            <p className="text-sm text-gray-600 capitalize">{booking.type} Booking</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          {booking.checkIn && (
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="h-4 w-4 mr-2" />
              <span>
                {booking.type === 'taxi' ? 'Transfer: ' : 'Check-in: '}
                {booking.checkIn.includes('T') ? 
                  new Date(booking.checkIn).toLocaleString() : 
                  formatDate(booking.checkIn)
                }
              </span>
            </div>
          )}
          {booking.checkOut && (
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Check-out: {formatDate(booking.checkOut)}</span>
            </div>
          )}
          {booking.guests && (
            <div className="flex items-center text-sm text-gray-600">
              <Users className="h-4 w-4 mr-2" />
              <span>{booking.guests} guests</span>
            </div>
          )}
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">${booking.totalPrice}</div>
          <div className="text-sm text-gray-500">
            Booked on {formatDate(booking.createdAt)}
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Booking ID: {booking.id}</span>
          <div className="space-x-2">
            <button className="text-blue-700 hover:text-blue-800 text-sm font-medium">
              View Details
            </button>
            <button className="text-red-600 hover:text-red-700 text-sm font-medium">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsPage;