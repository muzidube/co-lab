import Firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// here I want to import the seed file
// import { seedDatabase } from '../seed';

const config = {
    apiKey: "AIzaSyCA7IqbMyrtCgXbkzrattbSAXb2zDxthLk",
    authDomain: "co-lab-b72e0.firebaseapp.com",
    projectId: "co-lab-b72e0",
    storageBucket: "co-lab-b72e0.appspot.com",
    messagingSenderId: "1010378930918",
    appId: "1:1010378930918:web:766594dbd4eb9b5273d927" 
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// here is where I want to call the seed file (only ONCE!)
// seedDatabase(firebase);

export { firebase, FieldValue };
