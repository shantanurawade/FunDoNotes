import { View, Text, Pressable, Image, KeyboardAvoidingView, ScrollView, ActivityIndicator } from "react-native";
import { style } from "../Components/style";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import auth from '@react-native-firebase/auth';
import { TextInput } from "react-native-paper";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import { getUserSuccess, getUserRequest, getUserError } from "../../Redux/action";


GoogleSignin.configure({
    webClientId: '118005057864-8g61q.apps.googleusercontent.com',
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
    const [userCredential, setUserCredential] = useState({email:'',password:''})
    const [isChecked, setChecked] = useState(false);
    const [error, setError] = useState({ isInvalidEmail: false, isPasswordError: false, isNetworkError: false })

    const [isActivityLoading, setActivityLoader] = useState(false)
    // const isLoading = useSelector((state: any) => state.reducer.isLoading)

    //Function for handleing firebase signIn. 
    const onLogin = () => {

        setActivityLoader(true);

        // const dispatch = useDispatch()
        // // dispatch({type : GET_USER_REQUEST});
        // dispatch(getUserRequest());

        auth().signInWithEmailAndPassword(userCredential.email, userCredential.password).then(() => {

            //After successfull signIn this code will navigate to mainscreen.
            props.navigation.navigate('MainScreen')
            // setEmail('')
            // setPassword('')
            setActivityLoader(false);
            const user = auth().currentUser;

            // dispatch(getUserSuccess(user))
            // handleLogin(user);
        }).catch(error => {
            setActivityLoader(false);
            //Code to show errors.
            if (error.code === 'auth/invalid-credential') {
                setError({ ...error, isPasswordError: true });
            }
            if (error.code === 'auth/network-request-failed') {
                setError({ ...error, isNetworkError: true });
            }
            if (error.code === 'auth/invalid-email') {
                setError({ ...error, isInvalidEmail: true });
            }
            console.log(error);
            // dispatch(getUserError(error))
        })
    }
    const onLoginWithGoogle = () => {
        onGoogleButtonPress().then(
            () => console.log('Signed in with Google!')).catch(
                (error) => {
                    console.log('====================================');
                    console.log(error);
                    console.log('====================================');
                }).catch((error)=>{
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
                    <ScrollView showsVerticalScrollIndicator={false}>

                        <Text style={[style.text, style.mediumText, style.setMargin]}>Login</Text>

                        {/* Input for Email.*/}
                        <TextInput style={{ marginTop: 10, marginBottom: 10 }} label="Email" value={userCredential.email} mode="outlined" onChangeText={(value) => { setUserCredential({...userCredential, email:value}); setError({ ...error, isInvalidEmail: false }) }}></TextInput>

                        {/* Error for invalid email.*/}
                        {
                            error.isInvalidEmail ?
                                <Text style={{ color: 'red' }}> Entered mail is not valid</Text> : null
                        }

                        {/* Input for Password.*/}

                        <TextInput style={{ marginTop: 10 }} label="Password" value={userCredential.password} secureTextEntry={!isChecked} mode="outlined" onChangeText={(value) => { setUserCredential({...userCredential, password: value}); setError({ ...error, isPasswordError: false }) }} />
                        <View style={[style.setRow, { marginTop: 16 }]}>

                            <Pressable style={[{ width: 200, flexDirection: 'row' }]} onPress={() => {
                                setChecked(!isChecked);

                            }}>
                                <Text style={{ width: 18, color: 'white', borderWidth: 1, textAlign: 'center', backgroundColor: isChecked ? '#2596be' : 'white' }}>✓</Text>
                                <Text style={{ flex: 1 }}>  Show password</Text>

                            </Pressable>
                        </View>

                        {/* Error for wrong credintials.*/}
                        {
                            error.isPasswordError ?
                                <Text style={{ color: 'red' }}> Invalid credential</Text> : null
                        }
                        {
                            error.isNetworkError ?
                                <Text style={{ color: 'red' }}> Please check your network conectivity.</Text> : null
                        }

                        {/* Login button.*/}
                        <Pressable
                            onPress={() => {
                                if (userCredential.email != '' && userCredential.password != '') onLogin();
                                else setError({ ...error, isPasswordError: true })
                            }}
                            style={[style.container, style.button, style.setMarginTop]}>
                            {isActivityLoading ? <ActivityIndicator size='large' color='#00ff00' /> :
                                <Text style={[style.text, style.smallText]}>Login</Text>}
                        </Pressable>

                        {/*SignUp option for new user.*/}
                        <Pressable onPress={() => { props.navigation.navigate('SignUp') }}>
                            <Text style={[style.text, style.smallText, style.setPadding, style.linkText]}>SignUp</Text>
                        </Pressable>

                        {/*Social media login options.*/}
                        <View style={style.setRow}>
                            <Text style={[style.smallText, style.setPadding, { color: 'black' }]}>Login with : </Text>
                            <Pressable onPress={() => {
            
                                onLoginWithGoogle();
                            }}>
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
