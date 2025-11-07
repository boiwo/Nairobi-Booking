from app import create_app
from models import db, Stay

app = create_app()

stays_data = [
      {
        "name": "The Norfolk Hotel",
        "type": "hotel",
        "price": 13000,
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80",
        "location": "Central Nairobi",
        "description": "Historic hotel with beautiful gardens and elegant rooms.",
        "amenities": ["WiFi", "Pool", "Restaurant"],
        "specialOffer": False,
    },
    {
        "name": "Radisson Blu Nairobi",
        "type": "hotel",
        "price": 14000,
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
        "location": "Upper Hill",
        "description": "Upscale hotel with panoramic city views and dining options.",
        "amenities": ["WiFi", "Gym", "Spa"],
        "specialOffer": True,
    },
    {
        "name": "Hilton Nairobi",
        "type": "hotel",
        "price": 12500,
        "rating": 4.4,
        "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
        "location": "City Centre",
        "description": "International hotel chain with premium amenities.",
        "amenities": ["WiFi", "Restaurant", "Parking"],
        "specialOffer": False,
    },
    {
        "name": "Fairmont The Norfolk",
        "type": "hotel",
        "price": 16000,
        "rating": 4.9,
        "image": "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80",
        "location": "Central Nairobi",
        "description": "Luxury hotel with history and exceptional service.",
        "amenities": ["WiFi", "Pool", "Bar", "Spa"],
        "specialOffer": True,
    },
    {
        "name": "Nairobi Serena Hotel",
        "type": "hotel",
        "price": 13500,
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "location": "Central Nairobi",
        "description": "Award-winning hotel with elegant rooms and dining.",
        "amenities": ["WiFi", "Pool", "Spa", "Restaurant"],
        "specialOffer": False,
    },
    {
        "name": "Nairobi Safari Lodge",
        "type": "hotel",
        "price": 10500,
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=85&w=800",
        "location": "Westlands",
        "description": "Luxurious 5-star hotel with rooftop pool and spa.",
        "amenities": ["WiFi", "Pool","Bar"],
        "specialOffer": True,
    },
    {
        "name": "Uhuru Park Hotel",
        "type": "hotel",
        "price": 12500,
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170",
        "location": "Westlands",
        "description": "Luxurious 5-star hotel with rooftop pool and spa.",
        "amenities": ["WiFi", "Pool", "Parking", "Bar"],
        "specialOffer": True,
    },
    {
        "name": "Hilton Garden Inn Nairobi Airport",
        "type": "hotel",
        "price": 14500,
        "rating": 4.8,
        "image": "https://plus.unsplash.com/premium_photo-1687960116497-0dc41e1808a2?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1171",
        "location": "Westlands",
        "description": "Luxurious 5-star hotel with rooftop pool and spa.",
        "amenities": ["WiFi", "Pool", "Gym", "Bar"],
        "specialOffer": True,
    },
    {
        "name": "Westwood Apartments Nairobi",
        "type": "hotel",
        "price": 15500,
        "rating": 4.9,
        "image": "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "location": "Westlands",
        "description": "Luxurious 5-star hotel with rooftop pool and spa.",
        "amenities": ["WiFi", "Pool", "Gym", "Bar"],
        "specialOffer": True,
    },
]

with app.app_context():
    db.drop_all()
    db.create_all()

    for data in stays_data:
        stay = Stay(
            name=data["name"],
            type=data["type"],
            price=data["price"],
            rating=data["rating"],
            image=data["image"],
            location=data["location"],
            description=data["description"],
            amenities=",".join(data["amenities"]),
            specialOffer=data["specialOffer"],
        )
        db.session.add(stay)

    db.session.commit()
    print("✅ Seeded all stays successfully!")

