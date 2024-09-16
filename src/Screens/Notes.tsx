import { Pressable, Text, View } from 'react-native';
import { style } from './Components/style';
import React, { useEffect, useId, useState } from 'react';
import { ModalForNote } from './Modals/index';
import { firebase } from '@react-native-firebase/auth';


// type notes = { Title : string, description : string, title : string }
export default function Notes(props: any) {

    const [pinnedNotes, setPinnedNote] = useState([{}])
    const [otherNotes, setOtherNote] = useState([{}])
    const [note, setNotes] = useState([{}]);
    const user = firebase.auth().currentUser;
    const userId = user?.uid;
    const db = firebase.firestore();

    const getNotes = async () => {
        try {

            const notesSnapshotPinned = await db.collection("users").doc(userId).collection("notes").where("pinned", "==", true).get();
            const notesSnapshotOther = await db.collection("users").doc(userId).collection("notes").where("pinned", "==", false).get();

            const notesOther = notesSnapshotOther.docs.map(doc => ({

                noteIndex: doc.id,
                ...doc.data()

            }));
            const notesPinned = notesSnapshotPinned.docs.map(doc => ({

                noteIndex: doc.id,
                ...doc.data()

            }));

            setPinnedNote(notesPinned)
            setOtherNote(notesOther)
        }
        catch {
            console.warn('Something went wrong');

        }
    }


    const [onClickNote, setOnClickNote] = useState(false)
    const [index, setIndex] = useState(0);
    const isList: boolean = props.isList;

    useEffect(() => {
        getNotes();
    }, [props.isModalOpenForCreateNote])

    return (
        <View style={{ height: '84%' }}>

            {ModalForNote(index, onClickNote, setOnClickNote)}
            <Text style={style.smallText}>Pined</Text>

            <View style={[style.setRow, { flexWrap: 'wrap' }]}>

                {pinnedNotes.map((item: any) =>

                    <Pressable key={item.noteIndex} onPress={() => {
                        setIndex(item.noteIndex);
                        console.warn(item.noteIndex);
                        setOnClickNote(true);

                    }} style={[isList ? style.noteStyleList : style.noteStyleGrid, style.border]}>
                        <Text numberOfLines={5}>
                            <Text style={style.mediumText}>{item.title}{'\n'}</Text>
                            <Text style={style.discription} >{item.description}</Text>
                        </Text>
                    </Pressable>
                )}

            </View>

            <Text style={[style.smallText, { marginTop: 20 }]}>Other</Text>

            <View style={[style.setRow, { flexWrap: 'wrap', marginBottom: 12 }]}>


                {otherNotes.map((item: any) =>

                    <Pressable key={item.noteIndex} onPress={() => {
                        setIndex(item.noteIndex);
                        console.warn(index);
                        setOnClickNote(true);

                    }} style={[isList ? style.noteStyleList : style.noteStyleGrid, style.border]}>
                        <Text numberOfLines={5}>
                            <Text style={style.mediumText}>{item.title}{'\n'}</Text>
                            <Text style={style.discription} >{item.description}</Text>
                        </Text>
                    </Pressable>
                )}
            </View>

        </View >
    )
}

