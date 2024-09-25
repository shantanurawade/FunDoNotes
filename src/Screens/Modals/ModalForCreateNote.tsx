import { Text, View, Pressable, Modal, KeyboardAvoidingView, ScrollView, TextInput } from 'react-native';
import { style } from '../Components/style';
import { useState } from 'react';
import { saveNote } from '../Notes/Firebase/SetNotes';

export function OpenModalForCreateNote(isModalOpenForCreateNote: any, setModalForCreateNote: any) {
    const [Title, setTitle] = useState('');
    const [Discription, setDiscription] = useState('');
    const [pinned, setPinned] = useState(false);

    return (
        <Modal visible={isModalOpenForCreateNote} animationType='slide' >
            <KeyboardAvoidingView behavior={'height'} style={{ height: '100%' }}>
                <ScrollView style={{ flexGrow: 1 }}>

                    <View style={[style.setRow, style.createNoteNavigationPanel,{height:'40%'}]}>
                        <Pressable onPress={() => {

                            if (Title !== '' || Discription !== '') { saveNote(Title, Discription, pinned); }
                            setModalForCreateNote(false);
                            setDiscription('');
                            setPinned(false);
                            setTitle('');
                        }}>
                            <Text style={{ fontSize: 50 }}>{'<'} </Text>
                        </Pressable>
                        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                            <Pressable onPress={() => {
                                setPinned(true)
                            }} ><Text style={{ fontSize: 28, padding: 5, backgroundColor: pinned ? 'black' : 'white' }}>🖇️</Text></Pressable>
                            <Pressable ><Text style={{ fontSize: 28, padding: 5 }}>🔔</Text></Pressable>
                            <Pressable ><Text style={{ fontSize: 28, padding: 5 }}>📩</Text></Pressable>
                        </View>

                    </View>


                    <TextInput placeholder='Title' value={Title} multiline
                        onChangeText={(value) => setTitle(value)} style={{ width: '100%', height:'40%', fontSize: 35 }} />

                    <TextInput multiline={true} placeholder='Discription' value={Discription}
                        onChangeText={(value) => setDiscription(value)} style={[style.discription, { height: '500%', borderWidth: 1, width: '100%', fontSize: 25 }]} />
                </ScrollView>

            </KeyboardAvoidingView>

        </Modal>
    )
}