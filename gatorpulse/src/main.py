import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from flask import Flask

app = Flask(__name__)

# Initialize Firebase Admin SDK
cred = credentials.Certificate('../servicekey.json')
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://gatorpulse-6be77-default-rtdb.firebaseio.com/' # Replace <your-database-name>
})

# Now you can interact with Firebase services
ref = db.reference()

# Set a value at a specific path, commented out so we don't accidentally write more stuff to database
# ref.child("users").child("user123").set({"name": "Alice", "email": "alice@example.com"})
