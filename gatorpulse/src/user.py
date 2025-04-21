from firebase_admin import  firestore

class User:

    def __init__(self, doc):
        self.doc = doc
        self.name = doc.to_dict()["username"]
        self.bio = doc.to_dict()["biography"]
        self.pfp = doc.to_dict()["pfp"]
        self.id = doc.id

        self.db = firestore.client()
        self.ref = self.db.collection("users")

    def getUsername(self):
        return self.name

    def getBio(self):
        return self.bio

    def getPfp(self):
        return self.pfp

    def updateBio(self, newBio):
        self.bio = newBio
        self.ref.document(self.id).update({"biography": newBio})

    def updatePfp(self, newPfp):
        self.pfp = newPfp
        self.ref.document(self.id).update({"pfp": newPfp})