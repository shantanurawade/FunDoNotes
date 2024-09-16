import { Text, View, Pressable, Image, Modal, TouchableWithoutFeedback, ToastAndroid} from 'react-native';
import { style } from '../Components/style';
import auth from '@react-native-firebase/auth'
import { useState } from 'react';



export function OpenModalForLogout(isModalOpen: any, setModalOpen: any, props: any) {

    const [userName, setUserName] = useState('No name');

    const user = auth().currentUser;
    const onLogOut = () => {
        auth().signOut().then(() => {
            props.navigation.navigate('AuthenticationScreen')
            ToastAndroid.show("Logged out!", ToastAndroid.SHORT);
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

                        <Text style={{ fontSize: 30 }}>{user?.displayName}</Text>

                        <Pressable
                            onPress={() => onLogOut()}><Text style={[style.mediumText, style.setPadding, { color: 'red' }]}>LogOut</Text></Pressable>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}