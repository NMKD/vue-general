import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
const APIKEY = import.meta.env.VITE_APIKEY;
const AUTHDOMIAN = import.meta.env.VITE_AUTHDOMIAN;
const PROJECTID = import.meta.env.VITE_PROJECTID;
const STORAGEBUCKET = import.meta.env.VITE_STORAGEBUCKET;
const MESSAGINGSENDERID = import.meta.env.VITE_MESSAGINGSENDERID;
const APPID = import.meta.env.VITE_APPID;

// Your web app's Firebase configuration
const config = {
  apiKey: APIKEY,
  authDomain: AUTHDOMIAN,
  projectId: PROJECTID,
  storageBucket: STORAGEBUCKET,
  messagingSenderId: MESSAGINGSENDERID,
  appId: APPID,
};

const firebaseApp = initializeApp(config);
const fireStore = getDatabase(firebaseApp);
const fireStoreDb = () => fireStore;

export default fireStoreDb;
