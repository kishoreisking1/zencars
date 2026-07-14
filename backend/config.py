from pymongo import MongoClient
import os

# MongoDB Connection
MONGO_URI = "mongodb://localhost:27017"

client = MongoClient(MONGO_URI)

# Database
db = client["CarRentalDB"]

# Collections
users = db["users"]
cars = db["cars"]
bookings = db["bookings"]
payments = db["payments"]
reviews = db["reviews"]
contacts = db["contacts"]

# Secret Key
SECRET_KEY = "zencars_secret_key_2026"

# Upload Folder
UPLOAD_FOLDER = os.path.join(os.getcwd(), "uploads")