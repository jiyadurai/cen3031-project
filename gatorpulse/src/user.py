from firebase_admin import  firestore

# user object based on Firestore document
class User:

    def __init__(self, doc):
        # store original firestore doc
        self.doc = doc
        
        # extract data from firestore doc
        self.name = doc.to_dict()["username"]
        self.bio = doc.to_dict()["biography"]
        self.pfp = doc.to_dict()["pfp"]
        self.id = doc.id   # firestore document id

        # set up firestore client and reference to 'users'
        self.db = firestore.client()
        self.ref = self.db.collection("users")

    # getter methods
    def getUsername(self):
        return self.name

    def getBio(self):
        return self.bio

    def getPfp(self):
        return self.pfp

    # update user's bio in firestore and class instance
    def updateBio(self, newBio):
        self.bio = newBio
        self.ref.document(self.id).update({"biography": newBio})

    # update user's profile pic in firestore and class instance
    def updatePfp(self, newPfp):
        self.pfp = newPfp
        self.ref.document(self.id).update({"pfp": newPfp})
