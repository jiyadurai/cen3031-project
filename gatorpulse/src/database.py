import firebase_admin
from firebase_admin import credentials, firestore
from google.cloud.firestore_v1 import FieldFilter

# load service account credentials, initialize firebase admin sdk
cred = credentials.Certificate("./gatorpulse/servicekey.json")
firebase_admin.initialize_app(cred)

# create firestore client
db = firestore.client()

# reference to 'users' and 'profiles' collections
ref = db.collection("users")
profs = db.collection("profiles")


# Get the firestore document object for a user given the username.
def getUser(username):
    # ask 'users' for doc with matching username field
    user = ref.where(filter=FieldFilter("username", "==", username)).get()
    # if no match found, return -1
    if len(user) == 0:
        return -1
    else:
        # return first match
        return user[0]

# get firestore document for a profile given the username
def getProfile(username):
    # ask 'profiles' for a doc with matching username
    user = profs.where(filter=FieldFilter("username", "==", username)).get()
    # return -1 if not found, otherwise return first doc
    if len(user) == 0:
        return -1
    else:
        return user[0]
