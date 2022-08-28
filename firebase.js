// 必要な関数を import
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBg6Qb01r3FvvMYyX5a-CK_rjm6VmrBY7Q",
  authDomain: "calendar-app-3f3c9.firebaseapp.com",
  projectId: "calendar-app-3f3c9",
  storageBucket: "calendar-app-3f3c9.appspot.com",
  messagingSenderId: "235399015673",
  appId: "1:235399015673:web:4eb867d56a146028d3c628",
  measurementId: "G-HKQNQF2DYN",
}

// Firebaseアプリオブジェクトを初期化
const app = initializeApp(firebaseConfig)
// Firestoreを読み込み、db(databaseの略)として export
export const db = getFirestore(app)
