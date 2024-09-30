import { getFirestore, doc, setDoc } from "firebase/firestore";
import auth from '@react-native-firebase/auth'
import { createContext } from "react";


export const saveNote = async (title: string, description: string, pinned: boolean, setSaved: any) => {

    const currentDate: string = Date.now().toString();
    const db = getFirestore();
    const uid = auth().currentUser;

    try {
        if (uid) {
            await setDoc(doc(db, "users", uid.uid, "notes", currentDate), {
                title: title,
                description: description,
                pinned: pinned
            });
            console.log("Note saved successfully!");
            setSaved(true);
            
        }
        else console.warn("User Not Logged in");
    } catch (error) {
        console.log("Error saving note: ", error);
    }
};



export const updateNote = async (title: string, description: string, pinned: boolean, noteId: any, setSaved:any) => {

    // const currentDate: string = Date.now().toString();
    const db = getFirestore();
    const uid = auth().currentUser;

    try {

        console.log("User ID: ", uid?.uid);
        console.log("Note ID: ", noteId);
        console.log("Title: ", title);
        console.log("Description: ", description);
        console.log("Pinned: ", pinned);
    
        if (uid) {
            await setDoc(doc(db, "users", uid.uid, "notes", noteId), {
                title: title,
                description: description,
                pinned: pinned
            });
            console.log("Note saved successfully!");
            setSaved(true)            
        }
        else console.warn("User Not Logged in");
    } catch (error) {
        console.log("Error saving note: ", error);
    }
};