import { firebase } from "@react-native-firebase/auth";
import { setData } from "../../../SQLite/db";


const user = firebase.auth().currentUser;
const userId = user?.uid;
const db = firebase.firestore();
interface Note {
    description: string;
    noteIndex: string;
    pinned: number;
    recycled: number;
    title: string;
}


export const getNotes = async () => {

    try {

        const notesSnapshot = await db.collection("users").doc(userId).collection("notes").get();

        const notes = notesSnapshot.docs.map(doc => ({
            noteIndex: doc.id,
            description: doc.data().description || '',
            pinned: doc.data().pinned || 0,
            recycled: doc.data().recycled || 0,
            title: doc.data().title || ''
        }));

        notes.forEach(async (note) => {
            await setData(note.noteIndex, note.title, note.description, note.pinned);
            console.log('====================================');
            console.log(note.noteIndex);
            console.log('====================================');
        });


        return notes
    }
    catch {

        console.warn('Something went wrong');

    }
}

export const getNotesById = async (ref: any) => {

    try {

        const notesSnapshot = await db.collection("users").doc(userId).collection("notes").doc(ref).get();

        console.log('====================================');
        console.log(notesSnapshot);
        console.log('====================================');
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
