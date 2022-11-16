import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDXj2piXdTXpnUqQchUzg4Cyx9bXeMffJc",
    authDomain: "studentforstudent.firebaseapp.com",
    projectId: "studentforstudent",
    storageBucket: "studentforstudent.appspot.com",
    messagingSenderId: "76637508913",
    appId: "1:76637508913:web:83f13f5b66a1d7e5c30c10"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
