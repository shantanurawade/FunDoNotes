import { Pressable, Text, View } from 'react-native';
import { style } from './Components/style';
import React, { useEffect, useState } from 'react';
import { Note } from './Modal';
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
            Title: doc.id,
            ...doc.data()
        }));

        setNotes(notes)
    }
    catch {
        console.log('====================================');
        console.log("hhh");
        console.log('====================================');
    }
}


// useEffect(()=>{
// getNotes
// console.log('====================================');
// console.log(note);
// console.log('====================================');
// },[])


    const [onClickNote, setOnClickNote] = useState(false)
    const [index, setIndex] = useState(0);


    const isList: boolean = props.isList;
    return (
        <View style={{ height: '84%' }}>

            {Note(index, onClickNote, setOnClickNote)}
            <Text style={style.smallText}>Pined</Text>
            <Pressable onPress={() => {
                getNotes();
                console.log('====================================');
                console.log(note);
                console.log('===================================='); console.warn("pressed");

            }}><Text>Get Data</Text></Pressable>
            <View style={[style.setRow, { flexWrap: 'wrap' }]}>

                {note.map((item: any, index: any) =>

                    <Pressable key={index} onPress={() => {
                        setIndex(index);
                        console.warn(index);
                        setOnClickNote(true);
                        
                    }} style={[isList ? style.noteStyleList : style.noteStyleGrid, style.border]}>

                        <Text style={style.mediumText}>{item.Title}</Text>
                        <Text style={style.discription} numberOfLines={5}>{item.description}</Text>
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