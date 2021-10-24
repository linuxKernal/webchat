import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
        apiKey: "AIzaSyCSck29VdRQw-HbcX_EIdcrJCRZYRR34x0",
        authDomain: "web-chat-a9638.firebaseapp.com",
        projectId: "web-chat-a9638",
        storageBucket: "web-chat-a9638.appspot.com",
        messagingSenderId: "4045245740",
        appId: "1:4045245740:web:50dbff4c76a7c536a8f089"
}

app.initializeApp(firebaseConfig);
const db = app.firestore()
const storage = app.storage().ref()
export  {db,storage}

