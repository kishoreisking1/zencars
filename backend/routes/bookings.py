from flask import Blueprint, request, jsonify
from bson.objectid import ObjectId
from bson.errors import InvalidId
from datetime import datetime

from config import bookings, cars
from middleware.auth_middleware import token_required

bookings_bp = Blueprint("bookings", __name__)


# ==========================
# Book a Car
# ==========================
@bookings_bp.route("/book", methods=["POST"])
@token_required
def book_car():

    data = request.get_json()

    required = [
        "carId",
        "pickupDate",
        "returnDate",
        "pickupLocation",
        "totalAmount"
    ]

    for field in required:
        if field not in data:
            return jsonify({"message": f"{field} is required"}), 400

    try:
        car_id = ObjectId(data["carId"])
    except InvalidId:
        return jsonify({"message": "Invalid Car ID"}), 400

    car = cars.find_one({"_id": car_id})

    if not car:
        return jsonify({"message": "Car not found"}), 404

    if not car.get("available", True):
        return jsonify({"message": "Car is already booked"}), 400

    booking = {
        "userId": request.user["user_id"],
        "carId": data["carId"],
        "pickupDate": data["pickupDate"],
        "returnDate": data["returnDate"],
        "pickupLocation": data["pickupLocation"],
        "totalAmount": data["totalAmount"],
        "status": "Booked",
        "createdAt": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }

    result = bookings.insert_one(booking)

    cars.update_one(
        {"_id": car_id},
        {"$set": {"available": False}}
    )

    return jsonify({
        "message": "Booking Successful",
        "bookingId": str(result.inserted_id)
    }), 201


# ==========================
# Get All Bookings
@bookings_bp.route("/", methods=["GET"])
def get_bookings():

    booking_list = []

    for booking in bookings.find():

        car = cars.find_one({
            "_id": ObjectId(booking["carId"])
        })

        booking["_id"] = str(booking["_id"])

        booking["car"] = {
            "_id": str(car["_id"]),
            "brand": car["brand"],
            "model": car["model"],
            "image": car["image"],
            "pricePerDay": car["pricePerDay"]
        }

        booking_list.append(booking)

    return jsonify(booking_list), 200

    booking_list = []

    for booking in bookings.find():

        booking["_id"] = str(booking["_id"])

        car = cars.find_one({
            "_id": ObjectId(booking["carId"])
        })

        if car:

            booking["car"] = {
                "brand": car["brand"],
                "model": car["model"],
                "image": car["image"],
                "location": car["location"],
                "pricePerDay": car["pricePerDay"]
            }

        booking_list.append(booking)

    return jsonify(booking_list), 200


# ==========================
# Cancel Booking
# ==========================
@bookings_bp.route("/cancel/<booking_id>", methods=["DELETE"])
def cancel_booking(booking_id):

    try:
        object_id = ObjectId(booking_id)
    except InvalidId:
        return jsonify({"message": "Invalid Booking ID"}), 400

    booking = bookings.find_one({"_id": object_id})

    if not booking:
        return jsonify({"message": "Booking not found"}), 404

    cars.update_one(
        {"_id": ObjectId(booking["carId"])},
        {"$set": {"available": True}}
    )

    bookings.delete_one({"_id": object_id})

    return jsonify({"message": "Booking Cancelled"}), 200