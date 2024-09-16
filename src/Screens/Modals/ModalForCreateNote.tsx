import { Text, View, Pressable, Modal, KeyboardAvoidingView, ScrollView, TextInput } from 'react-native';
import { style } from '../Components/style';
import auth from '@react-native-firebase/auth'
// import { note } from './Notes';
import { useState } from 'react';
import { getFirestore, doc, setDoc } from "firebase/firestore";

const saveNote = async (title: string, description: string, pinned : boolean) => {

    const currentDate: string = Date.now().toString();
    const db = getFirestore();
    const uid = auth().currentUser;


    try {
        if (uid) {
            await setDoc(doc(db, "users", uid.uid, "notes", currentDate), {
                title: title,
                description: description,
                pinned : pinned
            });
            console.log("Note saved successfully!");
        }
        else console.warn("User Not Logged in");
    } catch (error) {
        console.log("Error saving note: ", error);
    }
};


export function OpenModalForCreateNote(isModalOpenForCreateNote: any, setModalForCreateNote: any) {
    const [Title, setTitle] = useState('');
    const [Discription, setDiscription] = useState('');
    const [pinned, setPinned] = useState(false);

    return (
        <Modal visible={isModalOpenForCreateNote} animationType='slide' >
            <KeyboardAvoidingView behavior={'height'}
                style={{ height: '100%' }}>
                <ScrollView style={{ flexGrow: 1 }}>

                    <View style={[style.setRow, style.createNoteNavigationPanel]}>
                        <Pressable onPress={() => {

                            if (Title !== '' || Discription !== '') { saveNote(Title, Discription,pinned); }
                            setModalForCreateNote(false);
                            setDiscription('');
                            setPinned(false);
                            setTitle('');
                        }}>
                            <Text style={{ fontSize: 50 }}>{'<'} </Text>
                        </Pressable>
                        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                            <Pressable onPress={()=>{
                                setPinned(true)
                            }} ><Text style={{ fontSize: 28, padding: 5, backgroundColor: pinned? 'black': 'white' }}>🖇️</Text></Pressable>
                            <Pressable ><Text style={{ fontSize: 28, padding: 5 }}>🔔</Text></Pressable>
                            <Pressable ><Text style={{ fontSize: 28, padding: 5 }}>📩</Text></Pressable>
                        </View>

                    </View>


                    <TextInput placeholder='Title' value={Title} multiline
                        onChangeText={(value) => setTitle(value)} style={{ width: '100%', fontSize: 50 }} />

                    <TextInput placeholder='Discription' value={Discription} multiline
                        onChangeText={(value) => setDiscription(value)} style={{ width: '100%', fontSize: 25, borderWidth: 1 }} />
                </ScrollView>

            </KeyboardAvoidingView>

        </Modal>
    )
}