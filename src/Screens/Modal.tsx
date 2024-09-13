import { Text, View, Pressable, Image, Modal, TouchableWithoutFeedback, KeyboardAvoidingView, ToastAndroid, ScrollView, TextInput } from 'react-native';
import { style } from './Components/style';
import auth from '@react-native-firebase/auth'
// import Notes, { noteOther } from './Notes';
import { useState } from 'react';
import { getFirestore, doc, setDoc } from "firebase/firestore";


// useEffect(()=> {
// // readNotes()
// console.log('====================================');
// console.log(readNotes());
// console.log('====================================');
// },[])

const saveNote = async (title: string, description: string) => {

    const db = getFirestore();
    const uid = auth().currentUser;

    console.warn(db);
    console.log('====================================');
    console.log("ffe");
    console.log('====================================');

    try {
        if (uid) {
            await setDoc(doc(db, "users", uid.uid, "notes", title), {
                title: title,
                description: description,
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

    return (
        <Modal visible={isModalOpenForCreateNote} animationType='slide' >
            <KeyboardAvoidingView behavior={'height'}
                style={{ height: '100%' }}>
                <ScrollView style={{ flexGrow: 1 }}>

                    <View style={[style.setRow, { height: '32%', justifyContent: 'space-between', borderWidth: 1 }]}>
                        <Pressable onPress={() => {
                            saveNote(Title, Discription);
                            console.log('====================================');
                            console.log('save');
                            console.log('====================================');
                            setModalForCreateNote(false);
                            setDiscription('');
                            setTitle('');
                        }}>
                            <Text style={{ fontSize: 50 }}>{'<'} </Text>
                        </Pressable>
                        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                            <Pressable ><Text style={{ fontSize: 28, padding: 5 }}>🖇️</Text></Pressable>
                            <Pressable ><Text style={{ fontSize: 28, padding: 5 }}>🔔</Text></Pressable>
                            <Pressable ><Text style={{ fontSize: 28, padding: 5 }}>📩</Text></Pressable>
                        </View>

                    </View>


                    <TextInput placeholder='Title' value={Title} multiline
                        onChangeText={(value) => setTitle(value)} style={{ width: '100%', fontSize: 50 }} />

                    <TextInput placeholder='Discription' value={Discription}
                        onChangeText={(value) => setDiscription(value)} style={{ width: '100%', fontSize: 25, borderWidth: 1 }} />
                </ScrollView>

            </KeyboardAvoidingView>

        </Modal>
    )
}

export function Note(index: any, onClickNote: any, setOnClickNote: any) {

    return (
        <Modal visible={onClickNote} animationType='fade' >
            <View style={{ height: 500 }}>
                <Pressable onPress={() => setOnClickNote(false)}>
                    <Text style={style.largeText}>  {"<"}</Text>
                </Pressable>

                {/* <TextInput value={noteOther[index].Title} onChangeText={() => { }} style={[style.mediumText, { borderWidth: 2, width: '100%', paddingTop: 50, alignItems: 'center' }]} ></TextInput>

                <TextInput multiline={true} style={[style.discription, { height: 500, borderWidth: 1 }]}>{noteOther[index].Discription}{'\n'}</TextInput> */}
                <Text ></Text>
            </View>
        </Modal>
    )
}


export function OpenModalForLogout(isModalOpen: any, setModalOpen: any, props: any) {

    const [userName, setUserName] = useState('No name');

    const user = auth().currentUser;
    const onLogOut = () => {
        auth().signOut().then(() => {
            props.navigation.navigate('AuthenticationScreen')
            ToastAndroid.show("Logged out!", ToastAndroid.SHORT);
        })
    }
    return (
        <Modal visible={isModalOpen} animationType='fade' transparent={true}>
            <TouchableWithoutFeedback onPress={() => setModalOpen(false)}>

                <View style={[style.container, { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>


                    <View style={[{ alignItems: 'center', backgroundColor: 'white', height: '40%', width: '90%', borderRadius: 20 }]}>
                        <Text style={[style.mediumText, style.setMarginTop, { color: 'black' }]}>Fun Do Notes</Text>
                        <Image source={require('../Assets/Images/Shantanu.jpg')}
                            style={[style.largeProfilePic, style.setPadding, { alignItems: 'flex-start' }]} />

                        <Text style={{ fontSize: 30 }}>{user?.displayName}</Text>

                        <Pressable
                            onPress={() => onLogOut()}><Text style={[style.mediumText, style.setPadding, { color: 'red' }]}>LogOut</Text></Pressable>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}