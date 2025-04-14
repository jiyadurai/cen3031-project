from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_cors import cross_origin
import firebase_admin
from firebase_admin import credentials, firestore
from google.cloud.firestore_v1 import FieldFilter

app = Flask(__name__)

# Apply CORS to all routes with the correct origin
CORS(
    app,
    resources={r"/*": {"origins": "http://localhost:5173"}},
    supports_credentials=True,
)

# Initialize Firebase
cred = credentials.Certificate("../servicekey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()
ref = db.collection("users")


@app.route("/")
def home():
    return "Server is up and running!"


@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    print(data.get("username"), data.get("password"), data.get("email"))

    usernameCheck = ref.where(
        filter=FieldFilter("username", "==", data.get("username"))
    ).get()
    emailCheck = ref.where(filter=FieldFilter("email", "==", data.get("email"))).get()

    if len(usernameCheck) > 0:
        return jsonify({"message": "failure!"})
    else:
        ref.add(
            {
                "createdAt": firestore.SERVER_TIMESTAMP,
                "email": data.get("email"),
                "username": data.get("username"),
                "password": data.get("password"),
            }
        )
        return jsonify({"message": "success!"}), 200


if __name__ == "__main__":
    app.run(debug=True, port=5000)
