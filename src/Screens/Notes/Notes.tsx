import { Pressable, Text, View, FlatList, ScrollView } from 'react-native';
import { style } from "../../Styles/style";
import React, { useEffect, useState } from 'react';
import { ModalForNote } from '../Modals/index';
import { getNotes, getNotesById } from './Firebase/GetNotes';
import { getData, initializeDb } from '../../SQLite/db';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { RefreshControl } from 'react-native';

// Interface that should be followed by every note created...
export type Note = {
    archived: number;
    description: string;
    noteIndex: string;
    pinned: number;
    recycled: number;
    title: string;
}

export default function Notes(props: any) {

    // Seperate array to manage Pinned and unPinned notes...
    const [pinnedNotes, setPinnedNote] = useState<Note[]>();
    const [otherNotes, setOtherNote] = useState<Note[]>();
    const [refreshing, setRefreshing] = useState(false);
    const [fetchedNotes, setFetchedNotes] = useState<Note[] | undefined>([]);
    // Used to open editor to update note...
    const [onClickNote, setOnClickNote] = useState(false);
    const [index, setIndex] = useState('');
    const [currentNote, setCurrentNote] = useState<Note>();
    const [isRefresh, setIsRefreshing] = useState(false);
    const [isRefresh1, setIsRefreshing1] = useState(false);
    const isList: boolean = props.isList;
    const isDarkTheme = useSelector((store: RootState) => store.themeState.isDarkTheme);
    const isOnline = useSelector((store: RootState) => store.internetState.isOnline);

    useEffect(() => {
        (async () => {
            try {
                initializeDb();
                if (isOnline === true) {
                    setFetchedNotes(await getNotes());
                    console.log('fetched by firebase');
                    console.log(fetchedNotes);
                }
                else {
                    setFetchedNotes(getData());
                    console.log('fetched by firebase');
                    console.log(fetchedNotes);
                }
                console.log('====================================');
                setPinnedNote(fetchedNotes?.filter(note => note.pinned == 1 && note.recycled == 0 && note.archived === 0));
                setOtherNote(fetchedNotes?.filter(note => note.pinned == 0 && note.recycled == 0 && note.archived === 0));
            } catch (error) {
                console.log("Something went wrong", error);
            }
        })()
        props.setSaved(false);
        setIsRefreshing1(false)
    }, [Notes, props.saved, isOnline, isRefresh]);

    return (
        <RefreshControl refreshing={isRefresh1} onRefresh={() => { setIsRefreshing(true) }}>

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
                                        <Text style={[isDarkTheme ? style.mediumTextDark : style.mediumText, { borderWidth: 1 }]}>{item.title}{'\n'}</Text>
                                        <Text style={style.discription}>{item.description}</Text>
                                    </Text>
                                </Pressable>
                            )
                        }} />
                    </View>

                    {/* Other Note by using flatList... */}
                    {otherNotes && otherNotes.length > 0 && (<Text style={{ fontSize: 20, color: isDarkTheme ? 'white' : 'black' }}>  Other</Text>)}
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
                                            <Text style={isDarkTheme ? style.mediumTextDark : style.mediumText}>{item.title}{'\n'}</Text>
                                            <Text style={style.discription}>{item.description}</Text>
                                        </Text>
                                    </Pressable>)

                            }} numColumns={isList ? 1 : 2} />
                    </View>
                </ScrollView>
            </View >
        </RefreshControl>

    )
}

