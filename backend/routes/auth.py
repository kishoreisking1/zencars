from flask import Blueprint, request, jsonify
from config import users, SECRET_KEY
import bcrypt
import jwt
import datetime

auth_bp = Blueprint("auth", __name__)


# ==========================
# Register User
# ==========================
@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    phone = data.get("phone")
    password = data.get("password")

    # Validation
    if not all([name, email, phone, password]):
        return jsonify({"message": "All fields are required"}), 400

    # Check existing user
    if users.find_one({"email": email}):
        return jsonify({"message": "Email already exists"}), 409

    # Hash password
    hashed_password = bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt()
    )

    user = {
        "name": name,
        "email": email,
        "phone": phone,
        "password": hashed_password,
        "role": "user"
    }

    users.insert_one(user)

    return jsonify({
        "message": "Registration Successful"
    }), 201


# ==========================
# Login User
# ==========================
@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    user = users.find_one({"email": email})

    if not user:
        return jsonify({"message": "Invalid Email"}), 401

    if not bcrypt.checkpw(
        password.encode("utf-8"),
        user["password"]
    ):
        return jsonify({"message": "Invalid Password"}), 401

    token = jwt.encode(
        {
            "user_id": str(user["_id"]),
            "email": user["email"],
            "exp": datetime.datetime.utcnow() + datetime.timedelta(days=1)
        },
        SECRET_KEY,
        algorithm="HS256"
    )

    return jsonify({
        "message": "Login Successful",
        "token": token,
        "name": user["name"],
        "email": user["email"]
    })