from flask import Flask, request, jsonify, send_from_directory, url_for, session
from flask_cors import CORS
from google.cloud.firestore_v1 import FieldFilter
import user, database
import googlemaps
from dotenv import load_dotenv
import os
from firebase_admin import firestore

# initialize flask
app = Flask(__name__)

# Apply CORS to all routes with the correct origin
cors = CORS(
    app,
    resources={r"*": {"origins": "http://localhost:5173"}},
    supports_credentials=True
)

# Initialize Firebase
load_dotenv(dotenv_path='./gatorpulse/.env')
api_key = os.environ.get("GOOGLE_API")   # google maps API key
app.secret_key = os.environ.get("FLASK_SECRET")   # flask key
gmaps = googlemaps.Client(key=api_key)    # maps API client

# initialize Firestore database
db = firestore.client()
ref = db.collection("users")     # reference to 'users'
profs = db.collection("profiles")   # reference to 'profiles'
posts = db.collection("posts")   # reference to 'posts'

# default profile picture
default_pfp = "./assets/blank-pfp.png"

# Post class that represents posts and interacts with Firestore
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

    # convert to dictionary to store in Firestore
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

    # create Post instance from Firestore doc
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

# checks route is up
@app.route("/")
def home():
    return "Server is up and running!"

# user login route
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    # check if user exists
    usernameCheck = ref.where(
        filter=FieldFilter("username", "==", data.get("username"))
    ).get()
    passCheck = ref.where(
        filter=FieldFilter("username", "==", data.get("username"))
    ).get()

    if len(usernameCheck) == 0:
        return jsonify({"message": "failure!"})
    else:
        passcode = passCheck[0].to_dict().get("password")
        if data.get("password") != passcode:
            # print("Password doesn't match!")
            return jsonify({"message": "login failure!"})
        # login successful, store user in session
        session['user'] = {'username' : data.get("username")}
        return jsonify({"message": "login success!"}), 200

# user logout route
@app.route("/logout", methods=["POST"])
def logout():
    session.clear()
    return jsonify({"message": "logout success!"}), 200

# get user that is logged in
@app.route("/getUser", methods=["POST"])
def getUser():
    user = session.get('user')
    if not user:
        return jsonify({"message": "failure!"}), 401
    return jsonify({'user': user}), 200

# user signup route
@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()

    # check for existing user or email
    usernameCheck = ref.where(
        filter=FieldFilter("username", "==", data.get("username"))
    ).get()
    emailCheck = ref.where(filter=FieldFilter("email", "==", data.get("email"))).get()

    if len(usernameCheck) > 0:
        return jsonify({"message": "signup failure!"})
    else:
        # add user to 'users' and 'profiles'
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
    

# View user profile. For testing profile settings
@app.route("/profile/<targetuser>", methods=["POST", "GET"])
def profile(targetuser):
    target_profile = database.getProfile(targetuser)
    if target_profile == -1:
        failure = jsonify(
            {
                "status": "failure"
            }
        )
        return failure
    
    data_dict = target_profile.to_dict()

    # use custom picture if set
    image_url = url_for('get_images', filename="blank-pfp.png")
    if data_dict['pfp'] != "none":
        image_url = data_dict['pfp']

    return jsonify({
        "displayname": data_dict['displayname'],
        "username": data_dict['username'],
        "biography": data_dict['biography'],
        "pfp_url": image_url
    })

# create new post route
@app.route("/makePost", methods=['POST'])
def make_post():
    data = request.get_json()
    candidates = gmaps.find_place(input=data.get("location"), input_type="textquery", fields=['place_id']).get('candidates')
    loc = candidates[0] if candidates else ""

    # add post to 'posts'
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

# edit profile info
@app.route("/editProfile", methods=["POST"])
def edit_profile():
    data = request.get_json()
    profile_query = profs.where(
        filter=FieldFilter("username", "==", data.get("username"))
    ).get()

    if not profile_query:
        return jsonify({"message": "edit failure!"})

    # update profile fields
    profile_to_update = profile_query[0]
    prof_ref = profs.document(profile_to_update.id)
    prof_ref.update({
        "displayname": data.get("displayName"),
        "biography": data.get("biography"),
        "pfp": data.get("image")
    })

    return jsonify({"message": "update success!"})

# get profile image from assets
@app.route("/images/<filename>", methods=["GET"])
def get_images(filename):
    return send_from_directory(directory='assets', path=filename)

# create post using Post class
@app.route('/create_post', methods=['POST'])
def create_post():
    data = request.get_json()

    # validate required areas
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

# gets all posts and profiles for display 
@app.route('/getAllPostsAndProfiles', methods=['POST'])
def get_all_posts():

    # gets all posts
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

    # gets all profiles
    allProfiles = {}
    for profile in profs.get():
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

# use Google Maps API to find place in Gainesville
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

# run flask app
if __name__ == "__main__":
    app.run(debug=True, port=5000)
