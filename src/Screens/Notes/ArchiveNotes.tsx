import { useEffect, useState } from "react";
import { Note } from "../Notes/Notes";
import { getNotes } from "../Notes/Firebase/GetNotes";
import { View, FlatList, Pressable, Text } from "react-native";
import { style } from "../../Styles/style";


// Code that seperates trashes notes...
export function ArchiveNotes() {

    // Array to store trashed notes...
    const [bined, setBined] = useState<Note[]>();
    // Used to select note in bin section for restore and permenent delete option...
    const [selectedNote, setSelectedNote] = useState<string | null>(null);

    // This will fetch notes onMount of BinNotes...
    useEffect(() => {

        const fetchNotes = async () => {
            try {
                const fetchedNotes = await getNotes();
                setBined(fetchedNotes?.filter(note => note.archived == 1))
            } catch {
                console.log("Something went wrong");
            }
        };
        fetchNotes();

    }, [ArchiveNotes]);


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
