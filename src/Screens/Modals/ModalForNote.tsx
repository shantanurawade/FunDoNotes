import { Text, View, Pressable, Modal, KeyboardAvoidingView, TextInput } from 'react-native';
import { style } from '../Components/style';
import { } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { saveNote, updateNote } from '../Notes/Firebase/SetNotes';




export function ModalForNote(currentNote: any, onClickNote: any, setOnClickNote: any, index: any, setSaved: any) {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [pinned, setPinned] = useState(false)
    useEffect(() => {
        console.log('hello');
        setDescription(currentNote?.description);
        setTitle(currentNote?.title);
    }, [onClickNote])
    return (
        <Modal visible={onClickNote} animationType='fade' >
            <View style={{ height: '200%' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Pressable onPress={() => {
                        setPinned(currentNote.pinned)
                        console.log("this is state");
                        
                        console.log(pinned);
                        console.log("this is variable ");
                        
                        console.log(currentNote.pinned);
                        
                        updateNote(title, description, currentNote.pinned, index, setSaved);
                        setOnClickNote(false);
                    }}>
                        <Text style={style.largeText}>  {"<"}</Text>
                    </Pressable>
                    <View style={{ alignItems: 'flex-end', flexDirection: 'row' }}>
                        <Pressable onPress={() => {

                        }}>
                            <Text style={style.largeText}>  📩</Text>
                        </Pressable>
                        <Pressable onPress={() => {

                        }}>
                            <Text style={style.largeText}>&#128465;</Text>
                        </Pressable>

                    </View>
                </View>
                <View >
                    <TextInput value={title} placeholder='Title' onChangeText={(value) => { setTitle(value) }} style={[style.largeText, { width: '100%' }]} />
                </View>
                <TextInput multiline={true} placeholder='Description' value={description} onChangeText={(value) => { setDescription(value) }} style={[style.discription, { height: 500 }]} />
                <Text ></Text>
            </View>
        </Modal>
    )
}


