import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyDgxSLLfr3A5sLBaWXb1sGuLcW6D__Ht4g",
  authDomain: "whatsappclone-6dfe6.firebaseapp.com",
  projectId: "whatsappclone-6dfe6",
  storageBucket: "whatsappclone-6dfe6.appspot.com",
  messagingSenderId: "504293413239",
  appId: "1:504293413239:web:80c0a613af0cdfe6401172"
}

const app = initializeApp(firebaseConfig)

const db = getFirestore()
const auth = getAuth()
const storage = getStorage()

const googleProvider = new GoogleAuthProvider()

export { db, auth, storage, googleProvider }
