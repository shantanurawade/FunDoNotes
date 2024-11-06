import { Text, View, Pressable, Modal, KeyboardAvoidingView, ScrollView, TextInput } from 'react-native';
import { style } from "../../Styles/style";
import { useState } from 'react';
import { saveNote } from '../Notes/Firebase/SetNotes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
// import { appDispatch } from '../../Redux/store';
// import { saveData } from '../../Redux/dispathcer';

export function OpenModalForCreateNote(isModalOpenForCreateNote: any, setModalForCreateNote: any, setSaved: any) {
    const [Title, setTitle] = useState('');
    const [Discription, setDiscription] = useState('');
    const [pinned, setPinned] = useState(0);
    const isDarkTheme = useSelector((store: RootState)=> store.themeState.isDarkTheme)
    // const dispatch = useDispatch<appDispatch>()

    return (
        <Modal visible={isModalOpenForCreateNote} animationType='slide' >
            <KeyboardAvoidingView behavior={'height'} style={{ height: '100%', backgroundColor: isDarkTheme ? "grey" : 'white' }}>
                <ScrollView style={{ flexGrow: 1 }}>

                    <View style={[style.setRow, style.createNoteNavigationPanel, { height: '40%' }]}>
                        <Pressable onPress={() => {

                            if (Title !== '' || Discription !== '') { saveNote(Title, Discription, pinned, setSaved); }
                            // dispatch(saveData())
                            setModalForCreateNote(false);
                            setDiscription('');
                            setPinned(0);
                            setTitle('');
                        }}>
                            <Text style={{ fontSize: 50 }}>{'<'} </Text>
                        </Pressable>
                        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                            <Pressable onPress={() => {
                                setPinned(1)
                            }} ><Text style={{ fontSize: 28, padding: 5, backgroundColor: pinned ? 'black' : 'white' }}>🖇️</Text></Pressable>
                            <Pressable ><Text style={{ fontSize: 28, padding: 5 }}>🔔</Text></Pressable>
                            <Pressable ><Text style={{ fontSize: 28, padding: 5 }}>📩</Text></Pressable>
                        </View>

                    </View>


                    <TextInput placeholder='Title' value={Title} multiline
                        onChangeText={(value) => setTitle(value)} style={[style.largeText, { width: '100%' }]} />

                    <TextInput multiline={true} placeholder='Discription' value={Discription}
                        onChangeText={(value) => setDiscription(value)} style={[style.discription, { height: '500%', width: '100%', fontSize: 25 }]} />

                </ScrollView>

            </KeyboardAvoidingView>

        </Modal>
    )
}