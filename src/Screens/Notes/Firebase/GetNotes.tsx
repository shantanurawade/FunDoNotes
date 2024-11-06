import { firebase } from "@react-native-firebase/auth";
import { setData } from "../../../SQLite/db";
import { Note } from "../Notes";

const user = firebase.auth().currentUser;
const userId = user?.uid;
const db = firebase.firestore();

export const getNotes = async () => {

    try {

        const notesSnapshot = await db.collection("users").doc(userId).collection("notes").get();

        const notes = notesSnapshot.docs.map(doc => ({
            noteIndex: doc.id,
            description: doc.data().description || '',
            pinned: doc.data().pinned || 0,
            recycled: doc.data().recycled || 0,
            title: doc.data().title || '',
            archived: doc.data().archived || 0
        }));

        notes.forEach(async (note) => await setData(note.noteIndex, note.title, note.description, note.pinned, note.archived, note.recycled));

        return notes;
    }
    catch {
        console.warn('Something went wrong');
    }
}

export const getNotesById = async (ref: any) => {

    try {
        const notesSnapshot = await db.collection("users").doc(userId).collection("notes").doc(ref).get();
        if (notesSnapshot) {
            const noteData = notesSnapshot.data() as Note;
            return noteData
        }
        else return undefined;
    }
    catch {
        console.warn('Something went wrong');
    }
    console.log('fdf');
}
