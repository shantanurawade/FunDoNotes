import { Pressable, Text, View, FlatList, ScrollView } from 'react-native';
import { style } from '../Components/style';
import React, { useEffect, useState } from 'react';
import { ModalForNote } from '../Modals/index';
import { getNotes, getNotesById } from './Firebase/GetNotes';
import { getData, initializeDb } from '../../SQLite/db';


// Interface that should be followed by every note created...
interface Note {
    description: string;
    noteIndex: string;
    pinned: number;
    recycled: number;
    title: string;
}


// Code that seperates trashes notes...
export function BinNotes() {

    // Array to store trashed notes...
    const [bined, setBined] = useState<Note[]>();
    // Used to select note in bin section for restore and permenent delete option...
    const [selectedNote, setSelectedNote] = useState<string | null>(null);

    // This will fetch notes onMount of BinNotes...
    useEffect(() => {

        const fetchNotes = async () => {
            try {
                const fetchedNotes = await getNotes();
                setBined(fetchedNotes?.filter(note => note.recycled == false))
            } catch {
                console.log("Something went wrong");
            }
        };
        fetchNotes();

    }, [BinNotes]);


    return (
        <View>
            <FlatList data={bined} renderItem={({ item }) => {
                return (
                    <View>
                        <Pressable style={[style.noteStyleGrid, style.border]}
                            onPress={() => { setSelectedNote(item.noteIndex) }}>
                            {selectedNote === item.noteIndex ?
                                <View style={{ flexDirection: 'row', alignContent: 'space-between' }}>
                                    <Pressable onPress={() => {
                                        console.log('====================================');
                                        console.log("Pressed", item.noteIndex);
                                        console.log('====================================');
                                    }}>
                                        <Text style={{ fontSize: 20 }}>Del</Text>
                                    </Pressable>
                                    <Pressable onPress={() => {
                                        console.log('====================================');
                                        console.log('Pressed');
                                        console.log('====================================');
                                    }}>
                                        <Text style={{ fontSize: 20 }}>Res</Text>
                                    </Pressable>
                                </View> :
                                <Text numberOfLines={5}>
                                    <Text style={[style.mediumText, { borderWidth: 1 }]}>{item.title}{'\n'}</Text>
                                    <Text style={style.discription}>{item.description}</Text>
                                </Text>}

                        </Pressable>
                    </View>
                )
            }}>

            </FlatList>
        </View>
    )
}

export default function Notes(props: any) {

    // Seperate array to manage Pinned and unPinned notes...
    const [pinnedNotes, setPinnedNote] = useState<Note[]>();
    const [otherNotes, setOtherNote] = useState<Note[]>();
    // Used to open editor to update note...
    const [onClickNote, setOnClickNote] = useState(false);
    const [index, setIndex] = useState('');
    const [currentNote, setCurrentNote] = useState<Note>()
    const isList: boolean = props.isList;

    useEffect(() => {
        initializeDb();
        const fetchNotes = async () => {
            try {
                const fetchedNotes = await getNotes();
                setPinnedNote(fetchedNotes?.filter(note => note.pinned == 1 && note.recycled == 0))
                setOtherNote(fetchedNotes?.filter(note => note.pinned == 0 && note.recycled == 0))
            } catch {
                console.log("Something went wrong");
            }
        };

        fetchNotes();
        getData()
        props.setSaved(false);
    }, [Notes, props.saved]);

    return (
        <View style={{ height: '84%' }}>

            {/* Modal for editing the note... */}
            {ModalForNote(currentNote, onClickNote, setOnClickNote, index, props.setSaved)}

            {/* Pinned Note by using flatList... */}
            <ScrollView showsVerticalScrollIndicator={false}>
                {pinnedNotes && pinnedNotes.length > 0 && (<Text style={{ fontSize: 20 }}>  Pinned</Text>)}
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

                {/* Other Note by using flatList... */}
                {otherNotes && otherNotes.length > 0 && (<Text style={{ fontSize: 20 }}>  Other</Text>)}
                <View style={[style.setRow, { flexWrap: 'wrap' }]}>
                    <FlatList data={otherNotes || []}
                        key={isList ? 'list' : 'grid'} renderItem={({ item }) => {
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

