const Firestore = require('@google-cloud/firestore');
const { v4: uuidv4 } = require('uuid');
const fireStore = new Firestore();

class RepositoryError extends Error {
  constructor(message) {
    super(message); x;
    this.message = message;
    this.name = 'RepositoryError';
    this.stack = this.stack;
    this.timestamp = Date.now();
  }
}

class FirestoreWrapper {
  constructor(collectionName) {
    this.collection = fireStore.collection(collectionName);
  }

  /*
 * @param {object} profile
 * @return {object} {status:boolean, data:string}
 */
  async AddUser(profile) {
    try {
      const { collection } = this;
      const docRef = collection.doc(profile.id);
      const user = await docRef.get();
      if (user) console.log('User already present');
      const newUser = {
        Id : uuidv4(),
        googleId: profile.id,
        displayName: profile.given_name,
        fullName: profile.name,
        verified_email: profile.verified_email,
        image: profile.picture,
      };
      await docRef.set(newUser);
      return ({ status: true, data: newUser.Id });
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = new FirestoreWrapper('Users');
