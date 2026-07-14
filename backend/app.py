from flask import Flask
from flask_cors import CORS

# Import Blueprints
from routes.auth import auth_bp
from routes.cars import cars_bp
from routes.bookings import bookings_bp
from routes.users import users_bp
from routes.payments import payments_bp

app = Flask(__name__)

CORS(app)

app.config["SECRET_KEY"] = "zencars_secret_key_2026"

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(cars_bp, url_prefix="/api/cars")
app.register_blueprint(bookings_bp, url_prefix="/api/bookings")
app.register_blueprint(users_bp, url_prefix="/api/users")
app.register_blueprint(payments_bp, url_prefix="/api/payments")

print(app.url_map)

@app.route("/")
def home():
    return {
        "message": "Welcome to Zencars Backend API",
        "status": "Running"
    }


if __name__ == "__main__":
    app.run(debug=True)