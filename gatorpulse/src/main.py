from flask import Flask, request, jsonify, url_for, send_from_directory
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from datetime import datetime
from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from flask_cors import CORS
from firebase_admin import firestore
from google.cloud.firestore_v1 import FieldFilter
import user, database

app = Flask(__name__)

# Apply CORS to all routes with the correct origin
cors = CORS(
    app,
    resources={r"/*": {"origins": "http://localhost:5173"}},
    supports_credentials=True,
)

# Initialize Firebase
db = firestore.client()
ref = db.collection("users")

default_pfp = "./assets/blank-pfp.png"


@app.route("/")
def home():
    return "Server is up and running!"

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    usernameCheck = ref.where(
        filter=FieldFilter("username", "==", data.get("username"))
    ).get()
    passCheck = ref.where(
        filter=FieldFilter("username", "==", data.get("username"))
    ).get()

    if len(usernameCheck) == 0:
        print("Username doesn't exist!")
        return jsonify({"message": "failure!"})
    else:
        passcode = passCheck[0].to_dict().get("password")
        if data.get("password") != passcode:
            print("Password doesn't match!")
            return jsonify({"message": "login failure!"})
        print("Logging in...")
        return jsonify({"message": "login success!"})

@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    print(data.get("username"), data.get("password"), data.get("email"))

    usernameCheck = ref.where(
        filter=FieldFilter("username", "==", data.get("username"))
    ).get()
    emailCheck = ref.where(filter=FieldFilter("email", "==", data.get("email"))).get()

    if len(usernameCheck) > 0:
        return jsonify({"message": "signup failure!"})
    else:
        ref.add(
            {
                "createdAt": firestore.SERVER_TIMESTAMP,
                "email": data.get("email"),
                "username": data.get("username"),
                "password": data.get("password"),
                "biography": "Write about yourself here!",
                "pfp": "none"
            }
        )
        return jsonify({"message": "signup success!"})

@app.route("/images/<filename>", methods=["GET"])
def get_images(filename):
    return send_from_directory(directory='assets', path=filename)

class Post:
    def __init__(self, id, username, media_type, url, title, description, likes=0, createdAt=None):
        self.id = id
        self.username = username
        self.media_type = media_type
        self.url = url
        self.title = title
        self.description = description
        self.likes = likes
        self.createdAt = createdAt or firestore.SERVER_TIMESTAMP

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "media_type": self.media_type,
            "url": self.url,
            "title": self.title,
            "description": self.description,
            "likes": self.likes,
            "createdAt": self.createdAt
        }

    @staticmethod
    def from_firestore(doc):
        data = doc.to_dict()
        return Post(
            username = data.get("username"),
            id = data.get("id"),
            media_type = data.get("media_type"),
            url = data.get("url"),
            title = data.get("title"),
            description = data.get("description"),
            likes = data.get("likes"),
            createdAt = data.get("createdAt")
        )

@app.route('/create_post', methods=['POST'])
def create_post():
    data = request.get_json()

    username = data.get("username"),
    id = data.get("id"),
    media_type = data.get("media_type"),
    url = data.get("url"),
    title = data.get("title"),
    description = data.get("description"),
    likes = data.get("likes"),

    if not username or not url:
        return jsonify({"message": "failure", "error": "Missing info"}), 400

    post = Post(id, username, media_type, url, title, description, likes)
    db.collection("posts").add(post.to_dict())

    return jsonify({"message": "success"})

# For testing profile settings
@app.route("/profile", methods=["POST", "GET"])
def profile():
    testUser = database.getUser("AdamApple")
    testUser = user.User(testUser)
    image_url = url_for('get_images', filename="blank-pfp.png")
    if testUser.getPfp() != "none":
        image_url = testUser.getPfp()

    testUser.updateBio("Hello! My name is Adam Apple!")

    return f"""
    <html>
        <head><title>{testUser.getUsername()}'s Profile</title></head>
        <body>
            <h1>{testUser.getUsername()}</h1>
            <p>{testUser.getBio()}</p>
            <img src={image_url} alt="Profile Picture" style="max-width:300px;" />
        </body>
    </html>
    """

if __name__ == "__main__":
    app.run(debug=True, port=5000)
