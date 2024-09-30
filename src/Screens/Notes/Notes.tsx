import { Pressable, Text, View, FlatList, ScrollView } from 'react-native';
import { style } from '../Components/style';
import React, { useEffect, useState } from 'react';
import { ModalForNote } from '../Modals/index';
import { getNotes, getNotesById } from './Firebase/GetNotes';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { updateNote } from './Firebase/SetNotes';
export default function Notes(props: any) {
    interface Note {
        description: string;
        noteIndex: string;
        pinned: boolean;
        title: string;
    }
    const [pinnedNotes, setPinnedNote] = useState<Note[]>()
    const [otherNotes, setOtherNote] = useState<Note[]>()




    const [onClickNote, setOnClickNote] = useState(false)
    const [index, setIndex] = useState('');
    const [currentNote, setCurrentNote] = useState<Note>()
    const isList: boolean = props.isList;

    useEffect(() => {


        const fetchNotes = async () => {
            try {
                const fetchedNotes = await getNotes();
                setPinnedNote(fetchedNotes?.filter(note => note.pinned == true))
                setOtherNote(fetchedNotes?.filter(note => note.pinned == false))
            } catch {
                console.log("Something went wrong");
            }
        };

        fetchNotes();
        props.setSaved(false);
    }, [Notes, props.saved]);


    return (
        <View style={{ height: '84%' }}>

            {ModalForNote(currentNote, onClickNote, setOnClickNote, index, props.setSaved)}
            {/* <Text style={style.smallText}>Pined</Text> */}

            {/* <View style={[style.setRow, { flexWrap: 'wrap' }]}>

                {pinnedNotes?.map((item: any) =>

                    <Pressable key={item.noteIndex} onPress={async () => {
                        setIndex(item.noteIndex);
                        const note = await getNotesById(item.noteIndex);
                        setCurrentNote(note); setOnClickNote(true); 4


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
                            <Text style={[style.mediumText,{borderWidth:1}]}>{item.title}{'\n'}</Text>
                            <Text style={style.discription} >{item.description}</Text>
                        </Text>
                    </Pressable>
                )}
            </View>  */}
            <ScrollView showsVerticalScrollIndicator={false}>

                
                    <Text style={{ fontSize: 20 }}>Pinned</Text>

                <View style={[style.setRow, { flexWrap: 'wrap', marginBottom: 12 }]}>
                    <FlatList data={pinnedNotes} numColumns={2} renderItem={({ item }) => {
                        return (
                            <Pressable style={[isList ? style.noteStyleList : style.noteStyleGrid, style.border]}
                                onPress={async () => {
                                    setIndex(item.noteIndex);
                                    const note = await getNotesById(item.noteIndex);
                                    setCurrentNote(note);
                                    setOnClickNote(true);
                                }}>
                                <Text numberOfLines={5}>
                                    <Text style={[style.mediumText, { borderWidth: 1 }]}>{item.title}{'\n'}</Text>
                                    <Text style={style.discription}>{item.description}</Text>
                                </Text>
                            </Pressable>
                        )
                    }} />
                </View>
                <Text style={{ fontSize: 20 }}>Other</Text>
                <View style={[style.setRow, { flexWrap: 'wrap' }]}>
                    <FlatList data={otherNotes} key={isList ? 'list' : 'grid'} renderItem={({ item }) => {
                        return (
                            <Pressable style={[isList ? style.noteStyleList : style.noteStyleGrid, style.border]}
                                onPress={async () => {
                                    setIndex(item.noteIndex);
                                    const note = await getNotesById(item.noteIndex);
                                    setCurrentNote(note);
                                    setOnClickNote(true);
                                }}>

                                <Text numberOfLines={5}>
                                    <Text style={style.mediumText}>{item.title}{'\n'}</Text>
                                    <Text style={style.discription}>{item.description}</Text>
                                </Text>
                            </Pressable>)

                    }} numColumns={isList ? 1 : 2} />
                </View>


            </ScrollView>
        </View >
    )
}

