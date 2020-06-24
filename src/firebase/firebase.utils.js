import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
   apiKey: "AIzaSyAeXTreFtLhPZFARp5k1kNyv1tUAvx5FpM",
    authDomain: "react-shop-34a5a.firebaseapp.com",
    databaseURL: "https://react-shop-34a5a.firebaseio.com",
    projectId: "react-shop-34a5a",
    storageBucket: "react-shop-34a5a.appspot.com",
    messagingSenderId: "487284994598",
    appId: "1:487284994598:web:a5cb501b53c6f0c861ace7"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  // const collectionRef = firestore.collection('users')

  const snapShot = await userRef.get();

  // const collectionSnapshot = await collectionRef.get()

  // console.log('DATA',{collection:  collectionSnapshot.docs.map(doc => doc.data())});
  

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocements = async (collectionKey, objectToAdd) => {
  const collecrionRef = firestore.collection(collectionKey);
console.log(collecrionRef);

  const batch = firestore.batch();
  objectToAdd.forEach(obj => {
    const newDocRef = collecrionRef.doc();
    batch.set(newDocRef, obj)
  })
  return await batch.commit()
}
 export const convertColectonsSnapshotToMap = (collections) => {
   const transformedColection = collections.docs.map(doc => {
     const {title, items} = doc.data();
     return{
      routeName:encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
     }
   })
   console.log(transformedColection);
   return transformedColection.reduce((accumlator, collection) => {
     accumlator[collection.title.toLowerCase()] = collection;
     return accumlator;
   }, {})
 }

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
