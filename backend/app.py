from flask import Flask, jsonify, request
from flask_cors import CORS
from models import db, Stay

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///stays.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)

    # ---------------- CRUD ----------------
    @app.route("/api/stays", methods=["GET"])
    def get_stays():
        stays = Stay.query.all()
        return jsonify([stay.to_dict() for stay in stays])

    @app.route("/api/stays/<int:id>", methods=["GET"])
    def get_stay(id):
        stay = Stay.query.get_or_404(id)
        return jsonify(stay.to_dict())

    @app.route("/api/stays", methods=["POST"])
    def add_stay():
        data = request.get_json()
        new_stay = Stay(
            name=data["name"],
            type=data["type"],
            price=data["price"],
            rating=data["rating"],
            image=data["image"],
            location=data["location"],
            description=data["description"],
            amenities=",".join(data.get("amenities", [])),
            specialOffer=data.get("specialOffer", False),
        )
        db.session.add(new_stay)
        db.session.commit()
        return jsonify(new_stay.to_dict()), 201

    @app.route("/api/stays/<int:id>", methods=["PUT"])
    def update_stay(id):
        stay = Stay.query.get_or_404(id)
        data = request.get_json()
        for key, value in data.items():
            if key == "amenities":
                setattr(stay, key, ",".join(value))
            else:
                setattr(stay, key, value)
        db.session.commit()
        return jsonify(stay.to_dict())

    @app.route("/api/stays/<int:id>", methods=["DELETE"])
    def delete_stay(id):
        stay = Stay.query.get_or_404(id)
        db.session.delete(stay)
        db.session.commit()
        return jsonify({"message": "Stay deleted successfully."})

    return app

# ✅ Make app available at module level for Gunicorn
app = create_app()

# Optional: create tables when the server starts
with app.app_context():
    db.create_all()

# Only run debug server locally
if __name__ == "__main__":
    app.run(debug=True)
