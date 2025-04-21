import firebase_admin
from firebase_admin import credentials, firestore
from google.cloud.firestore_v1 import FieldFilter

cred = credentials.Certificate("./gatorpulse/servicekey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()
ref = db.collection("users")
profs = db.collection("profiles")


# Get the document object for a user given the username.
def getUser(username):
    user = ref.where(filter=FieldFilter("username", "==", username)).get()
    if len(user) == 0:
        return -1
    else:
        return user[0]
    
def getProfile(username):
    user = profs.where(filter=FieldFilter("username", "==", username)).get()
    if len(user) == 0:
        return -1
    else:
        return user[0]