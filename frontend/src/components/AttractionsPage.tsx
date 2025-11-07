import React, { useState } from "react";
import { Star, Clock, Globe, Calendar } from "lucide-react";
import { Attraction } from "../types";

interface AttractionsPageProps {
  onBooking: (booking: any) => void;
  user: any;
  onSignIn: () => void;
}

const AttractionsPage: React.FC<AttractionsPageProps> = ({ onBooking, user, onSignIn }) => {
  const [dates, setDates] = useState<{ [key: string]: string }>({});
  const [language, setLanguage] = useState("English");

  const attractions: Attraction[] = [
    {
      id: "1",
      name: "Nairobi National Park",
      category: "Wildlife",
      price: 65,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1675513798169-a387a42e5844?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735",
      duration: "4-6 hours",
      description: "Experience wildlife just outside Nairobi city with rhinos, lions, and giraffes."
    },
    {
      id: "2",
      name: "David Sheldrick Elephant Orphanage",
      category: "Wildlife",
      price: 25,
      rating: 4.9,
      image: "https://plus.unsplash.com/premium_photo-1669740462478-135db9b990ea?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
      duration: "2-3 hours",
      description: "Visit baby elephants and learn about conservation efforts."
    },
    {
      id: "3",
      name: "Giraffe Centre",
      category: "Wildlife",
      price: 20,
      rating: 4.6,
      image: "https://plus.unsplash.com/premium_photo-1726805085752-bf0c66b58f29?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
      duration: "2 hours",
      description: "Feed and interact with endangered Rothschild giraffes."
    },
    {
      id: "4",
      name: "Karen Blixen Museum",
      category: "Culture",
      price: 15,
      rating: 4.3,
      image: "https://plus.unsplash.com/premium_photo-1678654259883-4d3cdcc0c853?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
      duration: "1-2 hours",
      description: 'Explore the historic home of the famous author of "Out of Africa".'
    }
  ];

  const handleBookNow = (attraction: Attraction) => {
    if (!user) return onSignIn();

    const selectedDate = dates[attraction.id];
    if (!selectedDate) {
      alert("Please select a date for this attraction.");
      return;
    }

    const booking = {
      id: Date.now().toString(),
      userId: user.id,
      type: "attraction",
      itemId: attraction.id,
      itemName: attraction.name,
      checkIn: selectedDate,
      language,
      totalPrice: attraction.price,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };

    onBooking(booking);
    alert(`Booking confirmed for ${attraction.name} on ${selectedDate}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Attractions in Nairobi</h1>
        <p className="text-gray-600 mt-2">Discover the best experiences Nairobi has to offer</p>

        <div className="mt-4">
          <label className="text-sm font-medium text-gray-700 mr-2">Tour Language:</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border rounded-md px-3 py-1 focus:ring-2 focus:ring-blue-500"
          >
            <option>English</option>
            
          </select>
        </div>
      </div>

      {/* Attractions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {attractions.map((attraction) => (
          <div
            key={attraction.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
          >
            <img
              src={attraction.image}
              alt={attraction.name}
              className="w-full h-52 object-cover"
            />

            <div className="p-6 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{attraction.name}</h3>
                  <p className="text-sm text-orange-600 font-medium">{attraction.category}</p>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm text-gray-700">{attraction.rating}</span>
                </div>
              </div>

              <div className="flex items-center text-gray-600 text-sm">
                <Clock className="h-4 w-4 mr-1" />
                {attraction.duration}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed">
                {attraction.description}
              </p>

              <div className="pt-3 border-t border-gray-200">
                <label className="block text-sm text-gray-700 mb-1">Select Date</label>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <input
                    type="date"
                    value={dates[attraction.id] || ""}
                    onChange={(e) =>
                      setDates({ ...dates, [attraction.id]: e.target.value })
                    }
                    className="border rounded-md px-2 py-1 flex-1 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-3">
                <div>
                  <span className="text-xl font-bold text-gray-900">${attraction.price}</span>
                  <span className="text-gray-500 ml-1 text-sm">per person</span>
                </div>

                <button
                  onClick={() => handleBookNow(attraction)}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md font-medium transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={!dates[attraction.id]}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttractionsPage;
