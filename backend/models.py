from app import db  # uses the same db instance (no circular import since db is declared before create_app)

class Stay(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    type = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Float, nullable=False)
    rating = db.Column(db.Float, nullable=False)
    image = db.Column(db.String(255))
    location = db.Column(db.String(100))
    description = db.Column(db.Text)
    amenities = db.Column(db.String(255))
    specialOffer = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "type": self.type,
            "price": self.price,
            "rating": self.rating,
            "image": self.image,
            "location": self.location,
            "description": self.description,
            "amenities": self.amenities.split(",") if self.amenities else [],
            "specialOffer": self.specialOffer,
        }

