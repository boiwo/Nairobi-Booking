export interface User {
  id: string;
  email: string;
  name: string;
  isAuthenticated: boolean;
}

export interface Stay {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  amenities: string[];
  description: string;
}

export interface Attraction {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  duration: string;
  description: string;
}

export interface CarRental {
  id: string;
  brand: string;
  model: string;
  type: string;
  pricePerDay: number;
  image: string;
  features: string[];
  availability: boolean;
}

export interface AirportTaxi {
  id: string;
  vehicleType: string;
  capacity: number;
  priceToCity: number;
  priceToAirport: number;
  image: string;
  features: string[];
}

export interface Booking {
  id: string;
  userId: string;
  type: 'stay' | 'attraction' | 'car' | 'taxi';
  itemId: string;
  itemName: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}