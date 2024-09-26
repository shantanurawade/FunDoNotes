import { Pressable, Text, View } from 'react-native';
import { style } from '../Components/style';
import React, { useEffect, useState } from 'react';
import { ModalForNote } from '../Modals/index';
import SQLite from 'react-native-sqlite-storage';
import { getNotes, getNotesById } from './Firebase/GetNotes';

export default function Notes(props: any) {
    interface Note {
        description: string;
        noteIndex: string;
        pinned: boolean;
        title: string;
    }
    const [pinnedNotes, setPinnedNote] = useState<Note[]>()
    const [otherNotes, setOtherNote] = useState<Note[]>()


    // const dbSql = SQLite.openDatabase(
    //     {
    //         name: 'mydb.db', // The name of your SQLite database file
    //         location: 'default' // Default location for the database file
    //     },
    //     () => {
    //         console.log('Database opened successfully');
    //     },
    //     error => {
    //         console.error('Error opening database: ', error);
    //     }
    // );

    const [onClickNote, setOnClickNote] = useState(false)
    const [index, setIndex] = useState(0);
    const [currentNote, setCurrentNote] = useState<Note>()
    const isList: boolean = props.isList;

    useEffect(() => {

        console.log('Enter');
        const fetchNotes = async () => {
            console.log('1');

            try {
                const fetchedNotes = await getNotes();
                console.log('2');
                setPinnedNote(fetchedNotes?.filter(note => note.pinned == true))
                setOtherNote(fetchedNotes?.filter(note => note.pinned == false))
            } catch {
                console.log("Something went wrong");
            }
            console.log('3');
        };

        fetchNotes();
    }, [Notes, props.isModalOpenForCreateNote]);


    // Create table on component mount
    // dbSql.transaction((tx) => {
    //     tx.executeSql(
    //         'CREATE TABLE IF NOT EXISTS Notes (id INTEGER PRIMARY KEY, title TEXT, description TEXT)',
    //         [],
    //         () => {
    //             console.log('Table created');
    //         },
    //         (error) => {
    //             console.error('Error creating table:', error);
    //             return false;
    //         }
    //     );
    // });
    // addNote();
    // getNotesSql();

    // const addNote = async () => {
    //     console.log('first')
    //     dbSql.transaction((tx: any) => {
    //         tx.executeSql(
    //             'INSERT INTO Notes (title, description) VALUES (?, ?)',
    //             ['Sample Title', 'Sample Description'],
    //             (tx: any, results: any) => {
    //                 console.log('Note inserted successfully:', results);
    //             },
    //             (error: any) => {
    //                 console.error('Error inserting note:', error);
    //             }
    //         );
    //     });
    // };


    // const getNotesSql = async () => {
    //     // Ensure the database is opened
    //     console.log('first')
    //     dbSql.transaction((tx: any) => {
    //         console.log('mid')
    //         tx.executeSql(
    //             'SELECT * FROM Notes',
    //             [],
    //             (tx: any, results: any) => {
    //                 let notes = [];
    //                 for (let i = 0; i < results.rows.length; i++) {
    //                     notes.push(results.rows.item(i));
    //                 }
    //                 console.log('Notes fetched:', notes);
    //             },
    //             (error: any) => {
    //                 console.error('Error fetching notes:', error);
    //             }
    //         );
    //     });
    // };

    return (
        <View style={{ height: '84%' }}>

            {ModalForNote(currentNote, onClickNote, setOnClickNote)}
            <Text style={style.smallText}>Pined</Text>

            <View style={[style.setRow, { flexWrap: 'wrap' }]}>

                {pinnedNotes?.map((item: any) =>

                    <Pressable key={item.noteIndex} onPress={async () => {
                        setIndex(item.noteIndex);
                        const note = await getNotesById(item.noteIndex);
                        setCurrentNote(note);                     setOnClickNote(true);

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


                {otherNotes?.map((item: any) =>

                    <Pressable key={item.noteIndex} onPress={async () => {
                        setIndex(item.noteIndex);
                        const note = await getNotesById(item.noteIndex);
                        setCurrentNote(note);
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

