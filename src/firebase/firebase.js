import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const normalConfig = {
  apiKey: 'AIzaSyCV6aMKRSoA4xgaojZdBZ9FxHjbud7Ubmo',
  authDomain: 'park-agile-6788e.firebaseapp.com',
  databaseURL: 'https://park-agile-6788e-default-rtdb.firebaseio.com',
  projectId: 'park-agile-6788e',
  storageBucket: 'park-agile-6788e.appspot.com',
  messagingSenderId: '116838330114',
  appId: '1:116838330114:web:1827a2f95eba9288aa5c1b',
  measurementId: 'G-LPLJM8MEDR',
};

// Api de Homologação

const homApiConfig = {
  apiKey: 'AIzaSyCV6aMKRSoA4xgaojZdBZ9FxHjbud7Ubmo',
  authDomain: 'park-agile-6788e.firebaseapp.com',
  databaseURL: 'https://park-agile-6788e-default-rtdb.firebaseio.com',
  projectId: 'park-agile-6788e',
  storageBucket: 'park-agile-6788e.appspot.com',
  messagingSenderId: '116838330114',
  appId: '1:116838330114:web:1827a2f95eba9288aa5c1b',
  measurementId: 'G-LPLJM8MEDR',
};

let config = normalConfig;

if (process.env.NODE_ENV === 'production') {
  config = homApiConfig;
} else if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  config = homApiConfig;
}

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export { db, auth, firebase };
