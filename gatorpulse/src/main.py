import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from flask_cors import CORS
from google.cloud.firestore_v1 import FieldFilter

app = Flask(__name__)
cors = CORS(app, origins="*")

# Initialize Firebase Admin SDK
cred = credentials.Certificate('./gatorpulse/servicekey.json') # Obtain private key from firebase and rename it to "servicekey.json"
firebase_admin.initialize_app(cred)

db = firestore.client()

ref = db.collection("users")

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    usernameCheck = ref.where(filter=FieldFilter("username", "==", data.get("username"))).get()
    passCheck = ref.where(filter=FieldFilter("username", "==", data.get("username"))).get()


    if len(usernameCheck) == 0:
        print("Username doesn't exist!")
        return jsonify({"message": "failure!"})
    else:
        passcode = passCheck[0].to_dict().get("password")
        if data.get("password") != passcode:
            print("Password doesn't match!")
            return jsonify({"message": "failure!"})
        print("Logging in...")
        return jsonify({"message": "success!"})


@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    print(data.get("username"), data.get("password"), data.get("email"))

    # Need to add encryption and email verification
    usernameCheck = ref.where(filter=FieldFilter("username", "==", data.get("username"))).get()
    emailCheck = ref.where(filter=FieldFilter("email", "==", data.get("email"))).get()

    if len(usernameCheck) > 0:
        print("Username already exists!")
        return jsonify({"message": "failure!"})
    else:
        print("Creating new user...")
        ref.add({
            "createdAt": firestore.SERVER_TIMESTAMP,
            "email": data.get("email"),
            "username": data.get("username"),
            "password": data.get("password")
        })
        return jsonify({"message": "success!"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)