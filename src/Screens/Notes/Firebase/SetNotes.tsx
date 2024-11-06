import { getFirestore, doc, setDoc, DocumentReference, DocumentData } from "firebase/firestore";
import auth from '@react-native-firebase/auth'
import { updateDoc } from "@react-native-firebase/firestore";
// import { savedNotes } from "../../../Redux/action";
import { useDispatch } from "react-redux";
// import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";
const db = getFirestore();
const uid = auth().currentUser;

// const dispatch = useDispatch();


const handleSavedNotes = (item: any) => {
    console.log('====================================');
    console.log("saved");
    console.log('====================================');
    // dispatch(savedNotes(item))
}

export const saveNote = async (title: string, description: string, pinned: number, setSaved: any) => {

    const currentDate: string = Date.now().toString();

    try {
        if (uid) {
            await setDoc(doc(db, "users", uid.uid, "notes", currentDate), {
                title: title,
                description: description,
                pinned: pinned,
                recycled: 0,
                archived: 0
            });
            console.log("Note saved successfully!");
            setSaved(true);
            // handleSavedNotes();
        }
        else console.warn("User Not Logged in");
    } catch (error) {
        console.log("Error saving note: ", error);
    }
};





export const updateNote = async (title: string, description: string, pinned: number, recycled: number, noteId: any, setSaved: any, archived: any) => {

    // const currentDate: string = Date.now().toString();

    try {

        console.log("User ID: ", uid?.uid);
        console.log("Note ID: ", noteId);
        console.log("Title: ", title);
        console.log("Description: ", description);
        console.log("Pinned: ", pinned);

        if (uid) {
            await setDoc(doc(db, "users", uid.uid, "notes", noteId), {
                title,
                description,
                pinned,
                recycled,
                archived
            });
            console.log("Note saved successfully!");
            setSaved(true)
        }
        else console.warn("User Not Logged in");
    } catch (error) {
        console.log("Error saving note: ", error);
    }
};

export const recycle = async (noteId: string, recycled: number, setSaved: any) => {

    try {
        if (uid) {
            const noteRef: any = doc(db, "users", uid.uid, "notes", noteId);


            await updateDoc(noteRef, {
                recycled: recycled
            });
        }
    }
    catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
    } finally {
        setSaved(true)
    }
}