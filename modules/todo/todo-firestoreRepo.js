/* eslint-disable linebreak-style */
const Firestore = require('@google-cloud/firestore');
const { v4: uuidv4 } = require('uuid');

class RepositoryError extends Error {
  constructor(message, stack) {
    super(message);
    this.message = message;
    this.name = 'RepositoryError';
    this.stack = stack;
    this.timestamp = Date.now();
  }
}
const fireStore = new Firestore();
class FirestoreWrapper {
  constructor(collectionName) {
    this.collection = fireStore.collection(collectionName);
  }

  /*
 * @param {object} data
 * @return {object} {status:boolean, data:string}
 */
  async setData(data) {
    const { collection } = this;
    const uniqueId = uuidv4();
    const docRef = collection.doc(uniqueId);
    await docRef.set({ ...data, id: uniqueId });
    return ({ status: true, data: uniqueId });
  }

  /*
 *
 * @return {object} {status:boolean, data:object}
 */
  async getData() {
    const { collection } = this;
    const dataset = await collection.get();
    return (dataset.docs.map(doc => doc.data()));
  }


  /*
 * @param {string} id
 * @return {object} {status:boolean, data:any}
 */
  async getDataById(id) {
    try {
      const { collection } = this;
      const docRef = collection.doc(id);
      const dataset = await docRef.get();
      if (!dataset.exists) return ({ status: false, data: null });
      return ({ status: true, data: dataset.data() });
    } catch (error) {
      throw new RepositoryError('Unable to find DB', error.message);
    }
  }

  /*
 * @param {id,payload} {string,object}
 * @return {object} {status:boolean}
 */
  async updateDataById(id, payload) {
    try {
      const { collection } = this;
      const docRef = collection.doc(id);
      await docRef.update(payload);
      return ({ status: true });
    } catch (error) {
      throw new RepositoryError('Unable to update to DB', error.message);
    }
  }


  /*
 * @param {object} {id:string}
 * @return {object} {status:boolean, data:null}
 */

  async deleteDataById(id) {
    const { collection } = this;
    const docRef = collection.doc(id);
    const dataset = await docRef.get();
    if (!dataset.exists) return { status: false, data: null };
    await docRef.delete();
    return ({ status: true, data: null });
  }
}
module.exports = new FirestoreWrapper('todoApp');
