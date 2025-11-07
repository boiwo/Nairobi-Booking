from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Stay(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    type = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    rating = db.Column(db.Float, nullable=False)
    image = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
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
