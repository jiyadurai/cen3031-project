from flask import Flask, request, jsonify, url_for, send_from_directory, session
from flask_cors import CORS
from flask_cors import cross_origin
import firebase_admin
from firebase_admin import firestore
from google.cloud.firestore_v1 import FieldFilter
import user, database
import googlemaps
from dotenv import load_dotenv
import os
from firebase_admin import credentials
from firebase_admin import firestore
from datetime import datetime
from flask import render_template, redirect, url_for, session

app = Flask(__name__)

# Apply CORS to all routes with the correct origin
cors = CORS(
    app,
    resources={r"*": {"origins": "http://localhost:5173"}},
    #origins=["http://localhost:5173", "http://localhost:5173/profile", "http://localhost:5173/makePost"],
    supports_credentials=True
)

# Initialize Firebase
# cred = credentials.Certificate("../servicekey.json")
# firebase_admin.initialize_app(cred)
load_dotenv(dotenv_path='./gatorpulse/.env')
api_key = os.environ.get("GOOGLE_API")
gmaps = googlemaps.Client(key=api_key)

db = firestore.client()
ref = db.collection("users")
profs = db.collection("profiles")
posts = db.collection("posts")

default_pfp = "./assets/blank-pfp.png"

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
        self.likeUsers = []

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "media_type": self.media_type,
            "url": self.url,
            "title": self.title,
            "description": self.description,
            "likes": self.likes,
            "createdAt": self.createdAt,
            "likeUsers": self.likeUsers
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
        session['user'] = {'username' : data.get("username")}
        return jsonify({"message": "login success!"}), 200

@app.route("/logout", methods=["POST"])
def logout():
    session.clear()
    return jsonify({"message": "logout success!"}), 200

@app.route("/getUser", methods=["POST"])
def getUser():
    user = session.get('user')
    if not user:
        return jsonify({"message": "failure!"}), 401
    return jsonify({'user': user}), 200

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
        profs.add(
            {
                "username": data.get("username"),
                "displayname": data.get("username"),
                "biography": "Write something about yourself",
                "pfp": "none"
            }
        )
        return jsonify({"message": "signup success!"}), 200
    

# For testing profile settings
@app.route("/profile/<targetuser>", methods=["POST", "GET"])
def profile(targetuser):
    print(f"Got request from {targetuser}")
    # target_user = database.getUser(target_user)
    # target_user = target_user.User(target_user)
    target_profile = database.getProfile(targetuser)
    if target_profile == -1:
        failure = jsonify(
            {
                "status": "failure"
            }
        )
        return failure
    
    data_dict = target_profile.to_dict()

    image_url = url_for('get_images', filename="blank-pfp.png")
    if data_dict['pfp'] != "none":
        image_url = data_dict['pfp']

    # testUser.updateBio("Hello! My name is Adam Apple!")

    response = jsonify({
        "displayname": data_dict['displayname'],
        "username": data_dict['username'],
        "biography": data_dict['biography'],
        "pfp_url": image_url
    })
    return response

@app.route("/makePost", methods=['POST'])
def make_post():
    data = request.get_json()
    print(data)
    candidates = gmaps.find_place(input=data.get("location"), input_type="textquery", fields=['place_id']).get('candidates')
    loc = candidates[0] if candidates else ""
    posts.add(
        {
            "username": data.get("username"),
            "title": data.get("title"),
            "description": data.get("description"),
            "date": data.get("selectedDate"),
            "image": data.get("image"),
            "location": loc,
            "likes": 0,
            "timeOfPost": data.get("timeOfPost"),
            "tag": data.get("tag"),
            "time": data.get("time")
        }
    )
    return jsonify({"message": "successfully posted"})

@app.route("/editProfile", methods=["POST"])
def edit_profile():
    data = request.get_json()
    # print(data.get("username"), data.get("password"), data.get("email"))
    print(data)

    profile_query = profs.where(
        filter=FieldFilter("username", "==", data.get("username"))
    ).get()

    if not profile_query:
        print("update failure")
        return jsonify({"message": "edit failure!"})
    
    profile_to_update = profile_query[0]
    prof_ref = profs.document(profile_to_update.id)
    prof_ref.update({
        "displayname": data.get("displayName"),
        "biography": data.get("biography"),
        "pfp": data.get("image")
    })
    
    # profs.add(
    #     {
    #         "username": data.get("username"),
    #         "displayname": data.get("username"),
    #         "biography": "Write something about yourself",
    #         "pfp": "none"
    #     }
    # )

    print("update success")
    return jsonify({"message": "update success!"})

@app.route("/images/<filename>", methods=["GET"])
def get_images(filename):
    return send_from_directory(directory='assets', path=filename)

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

@app.route('/getAllPostsAndProfiles', methods=['POST'])
def get_all_posts():
    result = {}
    allPosts = {}
    for post in posts.get():
        allPosts[post.id] = {
            'id': post.id,
            'username': post.get('username'),
            'title': post.get('title'),
            'description': post.get('description'),
            'image': post.get('image'),
            'location': post.get('location'),
            'date': post.get('date'),
            'timeOfPost': post.get('timeOfPost'),
            'likes': post.get('likes'),
            'tag': post.get('tag'),
            'time': post.get('time')
        }
    allProfiles = {}
    for profile in profs.get():
        print(profile.get('username'))
        allProfiles[profile.get('username')] = {
            'username': profile.get('username'),
            'displayname': profile.get('displayname'),
            'biography': profile.get('biography'),
            'pfp': profile.get('pfp')
        }
    return jsonify({
        'posts': allPosts,
        'profiles': allProfiles
    })

@app.route('/maps', methods=['GET'])
def maps():
    gainesville_coords = (29.6516, -82.3248)
    address = input("Enter an Address: ")
    res = gmaps.find_place(input=address,
                           input_type='textquery',
                           fields=['place_id'],
                           location_bias=f'circle:12000@{gainesville_coords[0]},{gainesville_coords[1]}')
    candidates = res.get('candidates')

    if candidates:
        place_id = candidates[0].get('place_id')
        res = gmaps.place(place_id=place_id, fields=['name', 'formatted_address'])
        place_name = res.get('result').get('name')
        formatted_address = res.get('result').get('formatted_address')

        if "Gainesville" not in formatted_address:
            return jsonify({"message": "No places found in Gainesville!"})

        return jsonify({"ID": place_id, "Name": place_name, "Address": formatted_address})
    else:
        return jsonify({"message": "No places found"})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
