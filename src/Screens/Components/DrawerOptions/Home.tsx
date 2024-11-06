import { Text, View, Pressable, TextInput, Image, ToastAndroid } from 'react-native';
import { style } from "../../../Styles/style";
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { OpenModalForLogout, OpenModalForCreateNote } from '../../Modals/index';
import Notes from '../../Notes/Notes';
import { useDispatch, useSelector } from 'react-redux';
import NetInfo from '@react-native-community/netinfo'
import { isActive, isOffline } from '../../../Redux/action';
import { RootState } from '../../../Redux/store';


export function Home(props: any) {


    const [isGrid, setGrid] = useState(false);
    const [isModalOpenForLogout, setModalForLogout] = useState(false)
    const [isModalOpenForCreateNote, setModalForCreateNote] = useState(false)
    const [saved, setSaved] = useState(false)
    const isDarkTheme = useSelector((store: RootState) => store.themeState.isDarkTheme);
    const netStatus = useSelector((store: RootState) => store.internetState.isOnline);
    const dispatch = useDispatch();

    const subscribe = NetInfo.addEventListener((state) => {
        const internet = state.isConnected;
        if (internet === true) {
            ToastAndroid.show(`Online mode on...`, ToastAndroid.SHORT);
            dispatch(isActive());
        }
        else {
            ToastAndroid.show(`Offline mode on...`, ToastAndroid.SHORT);
            dispatch(isOffline());
        }
    });



    return (


        <SafeAreaView style={{ flex: 1, backgroundColor: 'red' }}>

            {OpenModalForLogout(isModalOpenForLogout, setModalForLogout, props)}
            {OpenModalForCreateNote(isModalOpenForCreateNote, setModalForCreateNote, setSaved)}

            {/* <ScrollView style={{ flex: 1 }} > */}

            <View style={[style.mainHome, { backgroundColor: isDarkTheme ? 'black' : 'white' }]} >
                <View style={[style.searchBar, { backgroundColor: isDarkTheme ? "grey" : 'white' }]}>

                    <Pressable style={{ width: '16%' }} onPress={() => props.navigation.openDrawer()}>
                        <Text style={[style.text, style.mediumText]}>&#9776;</Text>
                    </Pressable>

                    <TextInput style={[isDarkTheme ? style.smallTextDark : style.smallText, { width: '60%' }]} placeholderTextColor={'black'} placeholder='Search for notes...'></TextInput>


                    <Pressable onPress={() => setGrid(!isGrid)} style={[{ width: '12%' }]}>

                        <Text style={[isDarkTheme ? style.smallTextDark : style.smallText, style.text]}>{isGrid ? 'List' : 'Grid'}</Text>

                    </Pressable>


                    <Pressable style={{ width: '16%' }} onPress={() => { setModalForLogout(true) }}>
                        {
                            netStatus ?
                                null :
                                <Text style={{ position: 'absolute', backgroundColor: '#e4a53e', fontWeight: 600, borderRadius: 10, bottom: 1, right: 20, fontSize: 12, width: 16, textAlign: 'center', zIndex: 1 }}>!</Text>

                        }
                        <Image source={require('../../../Assets/Images/Shantanu.jpg')}
                            style={[style.profilePic]} />

                    </Pressable>

                </View>

                <View style={style.createNote} >
                    {/* <TextInput style={[style.smallText, style.border, { width: '96%', alignSelf: 'center' }]} 
                        onFocus={()=> {setModalForCreateNote(true) ; }}  placeholder="Create new note" /> */}
                    <Pressable style={[style.border, { height: '100%', alignContent: 'center' }]}
                        onPress={() => setModalForCreateNote(true)}>
                        <Text style={[isDarkTheme ? style.smallTextDark : style.smallText]}>Empty Note</Text>
                    </Pressable>
                </View>

                <Notes saved={saved} setSaved={setSaved} isList={isGrid} setModalForCreateNote={setModalForCreateNote} isModalOpenForCreateNote={isModalOpenForCreateNote} />

            </View >
            {/* </ScrollView > */}
            <Pressable onPress={() => setModalForCreateNote(true)} style={style.createButton}>
                <Text style={[{ color: 'white', textAlign: 'center', fontSize: 50 }]}>+</Text>
            </Pressable>
            {/* <Pressable onPress={() => sqlite()  } style={style.createButton}>
                <Text style={[{ color: 'white', textAlign: 'center', fontSize: 50 }]}>+</Text> */}
            {/* </Pressable> */}
        </SafeAreaView>
    )
}


