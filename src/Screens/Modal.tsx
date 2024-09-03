import { Text, View, Pressable, Image, Modal, TouchableWithoutFeedback, ToastAndroid } from 'react-native';
import { style } from './Components/style';
import auth from '@react-native-firebase/auth'
import { noteOther } from './Notes';

export function OpenModalForCreateNote(isModalOpenForCreateNote: any, setModalForCreateNote: any) {
    return (
        <Modal visible={isModalOpenForCreateNote} animationType='slide' >
            <View style={[style.setRow, { flex: 1 }]}>
                <Pressable onPress={() => { setModalForCreateNote(false) }}><Text style={{ fontSize: 50 }}>{'<'} </Text></Pressable>
                <Pressable ><Text style={{ fontSize: 50 }}>Pin</Text></Pressable>
                <Pressable ><Text style={{ fontSize: 50 }}>Remi</Text></Pressable>
                <Pressable ><Text style={{ fontSize: 50 }}>Arch</Text></Pressable>

            </View>

        </Modal>
    )
}

export function Note(index: any, onClickNote : any) {

    return (
        <Modal visible={onClickNote} animationType='fade' transparent={true}>
            <View style={{flex: 1}}>
                <Text key={index}>{noteOther.map((note) => note.Title)}</Text>
                <Text>Hello</Text>
            </View>
        </Modal>
    )
}

export function OpenModalForLogout(isModalOpen: any, setModalOpen: any, props: any) {
    const onLogOut = () => {
        auth().signOut().then(() => {
            props.navigation.navigate('AutheticationScreen')
            ToastAndroid.show("This is a toast message!", ToastAndroid.SHORT);
        })
    }
    return (
        <Modal visible={isModalOpen} animationType='fade' transparent={true}>
            <TouchableWithoutFeedback onPress={() => setModalOpen(false)}>

                <View style={[style.container, { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>


                    <View style={[{ alignItems: 'center', backgroundColor: 'white', height: '40%', width: '90%', borderRadius: 20 }]}>
                        <Text style={[style.mediumText, style.setMarginTop, { color: 'black' }]}>Fun Do Notes</Text>
                        <Image source={require('../../Assets/Images/Shantanu.jpg')}
                            style={[style.largeProfilePic, style.setPadding, { alignItems: 'flex-start' }]} />

                        <Text style={{ fontSize: 30 }}>Shantanu Rawade</Text>


                        <Pressable
                            onPress={() => onLogOut()}><Text style={[style.mediumText, style.setPadding, { color: 'red' }]}>LogOut</Text></Pressable>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}