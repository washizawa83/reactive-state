import { initializeApp } from "firebase/app";
import { getFirestore, updateDoc, addDoc, collection, doc } from "firebase/firestore";
import { notificationStore } from "../store/appStore";

const firebaseConfig = {
    apiKey: "AIzaSyBhbr_Id6v4R-5ZnGES5GKBudKtjjUgLDg",
    authDomain: "reactive-state.firebaseapp.com",
    projectId: "reactive-state",
    storageBucket: "reactive-state.appspot.com",
    messagingSenderId: "945316273467",
    appId: "1:945316273467:web:c8aea4254b67414ee86b1e",
    measurementId: "G-WDBQ950EGR"
};

const app = initializeApp(firebaseConfig);
export const fireStore = getFirestore(app);

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
