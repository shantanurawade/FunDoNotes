import { Pressable, Text, View } from 'react-native';
import { style } from './Components/style';
import React, { useEffect, useId, useState } from 'react';
import { ModalForNote } from './Modals/index';
import { firebase } from '@react-native-firebase/auth';


// type notes = { Title : string, description : string, title : string }
export default function Notes(props: any) {

    const [note, setNotes] = useState([{}]);
    const user = firebase.auth().currentUser;
    const userId = user?.uid;
    const db = firebase.firestore();

    const getNotes = async () => {
        try {
            const notesSnapshot = await db.collection("users").doc(userId).collection("notes").get();

            const notes = notesSnapshot.docs.map(doc => ({
                noteIndex : doc.id,
                ...doc.data()
            }));

            setNotes(notes)
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

    })

    return (
        <View style={{ height: '84%' }}>

            {ModalForNote(index, onClickNote, setOnClickNote)}
            <Text style={style.smallText}>Pined</Text>

            <View style={[style.setRow, { flexWrap: 'wrap' }]}>

                {note.map((item: any) =>

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

            <Text style={[style.smallText, { marginTop: 20 }]}>Other</Text>

            <View style={[style.setRow, { flexWrap: 'wrap', marginBottom: 12 }]}>

                {/* {notePined?.map((item: any, index: number) =>
                    <View style={[isList ? style.noteStyleList : style.noteStyleGrid, style.border]}>

                        <Text key={index} style={style.mediumText}>{item.Title}</Text>
                        <Text key={index} style={style.discription} numberOfLines={5}>{item.Discription}</Text>
                    </View>
                )} */}

            </View>

        </View >
    )
}

