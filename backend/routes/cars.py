from flask import Blueprint, request, jsonify
from bson.objectid import ObjectId
from config import cars

cars_bp = Blueprint("cars", __name__)


# ==========================
# Get All Cars
# ==========================
@cars_bp.route("", methods=["GET"])
def get_all_cars():

    car_list = []

    for car in cars.find():
        car["_id"] = str(car["_id"])
        car_list.append(car)

    return jsonify(car_list), 200


# ==========================
# Get One Car
# ==========================
@cars_bp.route("/<car_id>", methods=["GET"])
def get_car(car_id):

    car = cars.find_one({"_id": ObjectId(car_id)})

    if not car:
        return jsonify({"message": "Car not found"}), 404

    car["_id"] = str(car["_id"])

    return jsonify(car), 200


# ==========================
# Add Car
# ==========================
@cars_bp.route("/add", methods=["POST"])
def add_car():

    data = request.get_json()

    required_fields = [
        "brand",
        "model",
        "year",
        "fuel",
        "transmission",
        "seats",
        "pricePerDay",
        "location",
        "image"
    ]

    for field in required_fields:
        if field not in data:
            return jsonify({"message": f"{field} is required"}), 400

    car = {
        "brand": data["brand"],
        "model": data["model"],
        "year": data["year"],
        "fuel": data["fuel"],
        "transmission": data["transmission"],
        "seats": data["seats"],
        "pricePerDay": data["pricePerDay"],
        "location": data["location"],
        "image": data["image"],
        "available": True
    }

    result = cars.insert_one(car)

    return jsonify({
        "message": "Car added successfully",
        "id": str(result.inserted_id)
    }), 201


# ==========================
# Update Car
# ==========================
@cars_bp.route("/<car_id>", methods=["PUT"])
def update_car(car_id):

    data = request.get_json()

    result = cars.update_one(
        {"_id": ObjectId(car_id)},
        {"$set": data}
    )

    if result.matched_count == 0:
        return jsonify({"message": "Car not found"}), 404

    return jsonify({"message": "Car updated successfully"}), 200


# ==========================
# Delete Car
# ==========================
@cars_bp.route("/<car_id>", methods=["DELETE"])
def delete_car(car_id):

    result = cars.delete_one({"_id": ObjectId(car_id)})

    if result.deleted_count == 0:
        return jsonify({"message": "Car not found"}), 404

    return jsonify({"message": "Car deleted successfully"}), 200
    