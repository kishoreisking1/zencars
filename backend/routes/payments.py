from flask import Blueprint, request, jsonify
from bson.objectid import ObjectId
from bson.errors import InvalidId
from datetime import datetime
from config import payments, bookings

payments_bp = Blueprint("payments", __name__)


# ==========================
# Make Payment
# ==========================
@payments_bp.route("/pay", methods=["POST"])
def make_payment():

    data = request.get_json()

    required = [
        "bookingId",
        "paymentMethod",
        "amount"
    ]

    for field in required:
        if field not in data:
            return jsonify({"message": f"{field} is required"}), 400

    try:
        booking_id = ObjectId(data["bookingId"])
    except InvalidId:
        return jsonify({"message": "Invalid Booking ID"}), 400

    booking = bookings.find_one({"_id": booking_id})

    if not booking:
        return jsonify({"message": "Booking not found"}), 404

    payment = {
        "bookingId": data["bookingId"],
        "paymentMethod": data["paymentMethod"],
        "amount": data["amount"],
        "status": "Paid",
        "paymentDate": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }

    result = payments.insert_one(payment)

    bookings.update_one(
        {"_id": booking_id},
        {
            "$set": {
                "status": "Paid"
            }
        }
    )

    return jsonify({
        "message": "Payment Successful",
        "paymentId": str(result.inserted_id)
    }), 201


# ==========================
# Payment History
# ==========================
@payments_bp.route("/", methods=["GET"])
def payment_history():

    payment_list = []

    for payment in payments.find():
        payment["_id"] = str(payment["_id"])
        payment_list.append(payment)

    return jsonify(payment_list), 200