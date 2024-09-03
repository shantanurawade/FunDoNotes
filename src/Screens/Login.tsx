import { View, Text, Pressable, Image, KeyboardAvoidingView, ScrollView, ActivityIndicator } from "react-native";
import { style } from "./Components/style";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import auth from '@react-native-firebase/auth';
import { TextInput } from "react-native-paper";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from "@react-native-async-storage/async-storage";

GoogleSignin.configure({
    webClientId: '1:118005057864:android:85daaa659edfc5195b0b7d',
});

async function onGoogleButtonPress() {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
}


function Login(props: any) {
    //State to manage userinputs and display errors.
    const [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    const [isEmailErrorForInvalid, setEmailErrorForInvalid] = useState(false)
    const [isErrorForPassword, setErrorForPassword] = useState(false)
    const [isErrorForNetwork, setErrorForNetwork] = useState(false)
    const [isActivityLoading, setActivityLoader] = useState(false)
    //Function for handleing firebase signIn. 
    const onLogin = () => {
        setActivityLoader(true);
        auth().signInWithEmailAndPassword(email, password).then((responce) => {

            //After successfull signIn this code will navigate to mainscreen.
            props.navigation.navigate('MainScreen')
            setEmail('')
            setPassword('')
            setActivityLoader(false);
        }).catch(error => {
            setActivityLoader(false);
            //Code to show errors.
            if (error.code === 'auth/invalid-credential') {
                setErrorForPassword(true);
            }
            if (error.code === 'auth/network-request-failed') {
                setErrorForNetwork(true);
            }
            if (error.code === 'auth/invalid-email') {
                setEmailErrorForInvalid(true);
            }
            console.log(error);
        })
    }
    const onLoginWithGoogle = () => {
        onGoogleButtonPress().then(
            () => console.log('Signed in with Google!')).catch(
                (error) => {
                    console.log('====================================');
                    console.log(error);
                    console.log('====================================');
                })

    }

    return (

        //UI for login.
        <SafeAreaView style={[style.container]}>

            <View style={style.setMargin}>
                <KeyboardAvoidingView>
                    <ScrollView>

                        <Text style={[style.text, style.mediumText, style.setMargin]}>Login</Text>

                        {/* Input for Email.*/}
                        <TextInput style={{ marginTop: 10, marginBottom: 10 }} label="Email" value={email} mode="outlined" onChangeText={(value) => { setEmail(value); setEmailErrorForInvalid(false) }}></TextInput>

                        {/* Error for invalid email.*/}
                        {
                            isEmailErrorForInvalid ?
                                <Text style={{ color: 'red' }}> Entered mail is not valid</Text> : null
                        }

                        {/* Input for Password.*/}
                        <TextInput style={{ marginTop: 10, marginBottom: 10 }} label="Password" value={password} mode="outlined" onChangeText={(value) => { setPassword(value); setErrorForPassword(false) }}></TextInput>

                        {/* Error for wrong credintials.*/}
                        {
                            isErrorForPassword ?
                                <Text style={{ color: 'red' }}> Invalid credential</Text> : null
                        }
                        {
                            isErrorForNetwork ?
                                <Text style={{ color: 'red' }}> Please check your network conectivity.</Text> : null
                        }

                        {/* Login button.*/}
                        <Pressable
                            onPress={() => {
                                if (email != '' && password != '') onLogin();
                                else setErrorForPassword(true)
                            }}
                            style={[style.container, style.button, style.setMarginTop]}>
                            {isActivityLoading ? <ActivityIndicator size='large' color='#00ff00' /> : <Text style={[style.text, style.smallText]}>Login</Text>}
                        </Pressable>

                        {/*SignUp option for new user.*/}
                        <Pressable onPress={() => { props.navigation.navigate('SignUp') }}>
                            <Text style={[style.text, style.smallText, style.setPadding, style.linkText]}>SignUp</Text>
                        </Pressable>

                        {/*Social media login options.*/}
                        <View style={style.setRow}>
                            <Text style={[style.smallText, style.setPadding, { color: 'black' }]}>Login with : </Text>
                            <Pressable onPress={() => { onLoginWithGoogle() }}>
                                <Image style={[style.profilePic, style.setSpacing]} source={require('../../Assets/Images/Google.png')} />
                            </Pressable>
                            <Image style={[style.profilePic, style.setSpacing]} source={require('../../Assets/Images/Facebook.png')} />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>

        </SafeAreaView >
    )
}


export default Login;
