import { firebase } from "@react-native-firebase/auth";


const user = firebase.auth().currentUser;
const userId = user?.uid;
const db = firebase.firestore();



export const getNotes = async () => {
    try {

        const notesSnapshot = await db.collection("users").doc(userId).collection("notes").get();

        const notes = notesSnapshot.docs.map(doc => ({
            noteIndex: doc.id,
            description: doc.data().description || '',  // Ensure description is always present
            pinned: doc.data().pinned || false,        // Ensure pinned is always present
            title: doc.data().title || ''

        }));

        return notes
    }
    catch {

        console.warn('Something went wrong');

    }
}

export const getNotesById = async (ref: any) => {

    interface Note {
        description: string;
        noteIndex: string;
        pinned: boolean;
        title: string;
    }
    console.log('111');
    
    try {

        const notesSnapshot = await db.collection("users").doc(userId).collection("notes").doc(ref).get();

        if(notesSnapshot){
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
