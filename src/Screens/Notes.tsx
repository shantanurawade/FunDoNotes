import { Pressable, Text, View } from 'react-native';
import { style } from './Components/style';
import React, { useEffect, useId, useState } from 'react';
import { ModalForNote } from './Modals/index';
import { firebase } from '@react-native-firebase/auth';
import SQLite from 'react-native-sqlite-2';



// type notes = { Title : string, description : string, title : string }
export default function Notes(props: any) {

    const [pinnedNotes, setPinnedNote] = useState([{}])
    const [otherNotes, setOtherNote] = useState([{}])
    const user = firebase.auth().currentUser;
    const userId = user?.uid;
    const db = firebase.firestore();

    const dbSql = SQLite.openDatabase('myDatabase.db', '1.0', '', 1);

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
        // Create table on component mount
        dbSql.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Notes (id INTEGER PRIMARY KEY, title TEXT, description TEXT)',
                [],
                () => {
                    console.log('Table created');
                },
                (error) => {
                    console.error('Error creating table:', error);
                    return false;
                }
            );
        });
        addNote();
        getNotesSql();
    }, [props.isModalOpenForCreateNote]);

    const addNote = async () => {
        console.log('first')
        dbSql.transaction((tx: any) => {
            tx.executeSql(
                'INSERT INTO Notes (title, description) VALUES (?, ?)',
                ['Sample Title', 'Sample Description'],
                (tx: any, results: any) => {
                    console.log('Note inserted successfully:', results);
                },
                (error: any) => {
                    console.error('Error inserting note:', error);
                }
            );
        });
    };


    const getNotesSql = async () => {
        // Ensure the database is opened
        console.log('first')
        dbSql.transaction((tx: any) => {
            console.log('mid')
            tx.executeSql(
                'SELECT * FROM Notes',
                [],
                (tx: any, results: any) => {
                    let notes = [];
                    for (let i = 0; i < results.rows.length; i++) {
                        notes.push(results.rows.item(i));
                    }
                    console.log('Notes fetched:', notes);
                },
                (error: any) => {
                    console.error('Error fetching notes:', error);
                }
            );
        });
    };

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

