from functools import wraps
from flask import request, jsonify
import jwt

from config import SECRET_KEY


def token_required(f):

    @wraps(f)
    def decorated(*args, **kwargs):

        token = None

        auth_header = request.headers.get("Authorization")

        if auth_header and auth_header.startswith("Bearer "):
            token = auth_header.split(" ")[1]

        if not token:
            return jsonify({"message": "Token is missing"}), 401

        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            request.user = data

        except jwt.ExpiredSignatureError:
            return jsonify({"message": "Token Expired"}), 401

        except jwt.InvalidTokenError:
            return jsonify({"message": "Invalid Token"}), 401

        return f(*args, **kwargs)

    return decorated