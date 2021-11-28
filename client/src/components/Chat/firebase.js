import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export const auth = firebase.initializeApp({
  apiKey: 'AIzaSyAQlx-zNp5nE8xoiK5SxdGZ-bKzU_ZpdiQ',
  authDomain: 'tradeday-ef3b6.firebaseapp.com',
  projectId: 'tradeday-ef3b6',
  storageBucket: 'tradeday-ef3b6.appspot.com',
  messagingSenderId: '221217442133',
  appId: '1:221217442133:web:7e0a5a955ca2c9825f87dc',
  measurementId: 'G-KZHMTC657B',
}).auth();
