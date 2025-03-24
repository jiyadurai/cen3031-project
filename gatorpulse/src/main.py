import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from flask import Flask, render_template, request, redirect, url_for, session

app = Flask(__name__)

# Initialize Firebase Admin SDK
cred = credentials.Certificate('../servicekey.json') # Obtain private key from firebase and rename it to "servicekey.json"
firebase_admin.initialize_app(cred)

db = firestore.client()

ref = db.collection("users")

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