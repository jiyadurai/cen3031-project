import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, origins="*")

# Initialize Firebase Admin SDK
cred = credentials.Certificate('./gatorpulse/servicekey.json') # Obtain private key from firebase and rename it to "servicekey.json"
firebase_admin.initialize_app(cred)

db = firestore.client()

ref = db.collection("users")
'''
print("Adding users to database, type \"end\" to end process.")

while True:
    email = input("Enter your email.\n")
    if email == "end":
        break
    name = input("Enter your name.\n")
    if name == "end":
        break
    ref.add({
        "createdAt": firestore.SERVER_TIMESTAMP,
        "email": email,
        "name": name
    })
'''

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    print(data.get("username"), data.get("password"))
    return jsonify({"message": "success!"})

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    print(data.get("username"), data.get("password"), data.get("email"))

    # Need to add encryption and email verification

    ref.add({
        "createdAt": firestore.SERVER_TIMESTAMP,
        "email": data.get("email"),
        "username": data.get("username"),
        "password": data.get("password")
    })
    return jsonify({"message": "success!"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)