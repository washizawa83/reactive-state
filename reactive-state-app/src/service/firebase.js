import { initializeApp } from "firebase/app";
import { getFirestore, updateDoc, setDoc, doc } from "firebase/firestore";
import { notificationStore } from "../store/appStore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const fireStore = getFirestore(app);
export const provider = new GoogleAuthProvider()
export const auth = getAuth(app);

export const createUser = async(userId, data) => {
    await setDoc(doc(fireStore, "users", userId), data);
}

export const updateCurrentState = async(userId, stateId) => {
    await updateDoc(doc(fireStore, 'users', userId), {state_id: stateId})
    .then(() => {
        notificationStore.set({message: 'Update state', type: 'success'})
    })
}

export const updateSideNote = async(userId, sideNote) => {
    await updateDoc(doc(fireStore, 'users', userId), {side_note: sideNote})
    .then(() => {
        notificationStore.set({message: 'Updated side note', type: 'success'})
    })
}

export const updateState = async(userId, states) => {
    if (states == null) return
    await updateDoc(doc(fireStore, 'users', userId), {states})
    .then(() => {
        notificationStore.set({message: 'Update state', type: 'success'})
    })
}
