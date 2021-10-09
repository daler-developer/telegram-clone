import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyB57QksFy_Us8nvAkx_WF6tuyEhBulLrzs",
  authDomain: "testproject1-41e96.firebaseapp.com",
  databaseURL: "https://testproject1-41e96-default-rtdb.firebaseio.com",
  projectId: "testproject1-41e96",
  storageBucket: "testproject1-41e96.appspot.com",
  messagingSenderId: "287040450745",
  appId: "1:287040450745:web:ed576786cc2a4c2965ab68",
  measurementId: "G-H99KHTVL4P"
}

const app = initializeApp(firebaseConfig)

const db = getFirestore()
const auth = getAuth()

const googleProvider = new GoogleAuthProvider()

export { db, auth, googleProvider }
