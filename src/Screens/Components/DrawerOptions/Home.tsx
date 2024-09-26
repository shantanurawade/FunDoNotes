import { Text, View, Pressable, TextInput, Image, ScrollView } from 'react-native';
import { style } from '../../Components/style';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { OpenModalForLogout, OpenModalForCreateNote } from '../../Modals/index';
import Notes from '../../Notes/Notes';

export function Home(props: any) {

    const [isGrid, setGrid] = useState(false);
    const [isModalOpenForLogout, setModalForLogout] = useState(false)
    const [isModalOpenForCreateNote, setModalForCreateNote] = useState(false)

    return (

        <SafeAreaView style={{ flex: 1 }}>

            {OpenModalForLogout(isModalOpenForLogout, setModalForLogout, props)}
            {OpenModalForCreateNote(isModalOpenForCreateNote, setModalForCreateNote)}

            <ScrollView style={{ flex: 1 }} >

                <View style={[style.mainHome]} >
                    <View style={style.searchBar}>

                        <Pressable style={{ width: '16%' }} onPress={() => props.navigation.openDrawer()}>
                            <Text style={[style.text, style.mediumText]}>&#9776;</Text>
                        </Pressable>

                        <TextInput style={[style.smallText, { width: '60%' }]} placeholderTextColor={'black'} placeholder='Search for notes...'></TextInput>


                        <Pressable onPress={() => setGrid(!isGrid)} style={[{ width: '12%' }]}>

                            <Text style={[style.smallText, style.text]}>{isGrid ? 'List' : 'Grid'}</Text>

                        </Pressable>


                        <Pressable style={{ width: '16%' }} onPress={() => { setModalForLogout(true) }}>

                            <Image source={require('../../../Assets/Images/Shantanu.jpg')}
                                style={[style.profilePic]} />

                        </Pressable>

                    </View>

                    <View style={style.createNote} >
                        {/* <TextInput style={[style.smallText, style.border, { width: '96%', alignSelf: 'center' }]} 
                        onFocus={()=> {setModalForCreateNote(true) ; }}  placeholder="Create new note" /> */}
                        <Pressable style={[style.border, { height: '100%', alignContent: 'center' }]}
                            onPress={() => setModalForCreateNote(true)}>
                            <Text style={[style.smallText]}>Empty Note</Text>
                        </Pressable>
                    </View>

                    <Notes isList={isGrid} setModalForCreateNote={setModalForCreateNote} isModalOpenForCreateNote={isModalOpenForCreateNote} />

                </View >
            </ScrollView >
            {/* <View style={{ height: '8%' }}>

                <View style={{ height: '100%',  alignItems: 'flex-end', paddingBottom: 5 }}>

                </View>
            </View> */}
            <Pressable onPress={() => setModalForCreateNote(true)} style={style.createButton}>
                <Text style={[{ color: 'white', textAlign: 'center', fontSize: 50 }]}>+</Text>
            </Pressable>
        </SafeAreaView>
    )
}


