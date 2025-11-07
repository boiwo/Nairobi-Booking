from flask import Flask, jsonify, request
from flask_cors import CORS
from models import db, Stay

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///stays.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)

    # CRUD
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

    return app

if __name__ == "__main__":
    app = create_app()
    with app.app_context():
        db.create_all()
    app.run(debug=True)

