import { getFirestore, doc, setDoc } from "firebase/firestore";
import auth from '@react-native-firebase/auth'

export const saveNote = async (title: string, description: string, pinned: boolean) => {

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
        }
        else console.warn("User Not Logged in");
    } catch (error) {
        console.log("Error saving note: ", error);
    }
};