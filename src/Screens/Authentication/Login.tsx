import { View, Text, Pressable, Image, KeyboardAvoidingView, ScrollView } from "react-native";
import { style } from "../Components/style";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import LinearGradient from "react-native-linear-gradient";
import LoginUsingEmail from "./LoginUsingEmail";
import LoginUsingPhone from "./LoginUsingPhone";


GoogleSignin.configure({
    webClientId: '799467742576-dr6mfrc2o8n8q5gd32l3ah8iiqj85kei.apps.googleusercontent.com'
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
    const [userCredential, setUserCredential] = useState({ email: '', password: '' })
    const [isPhoneLogIn, setPhoneLogin] = useState(false);
    const [isChecked, setChecked] = useState(false);
    const [error, setError] = useState({ isInvalidEmail: false, isPasswordError: false, isNetworkError: false, isSomethingWentWrong: false })

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
            setUserCredential({ email: '', password: '' })
            setActivityLoader(false);
            setError({ isInvalidEmail: false, isPasswordError: false, isNetworkError: false, isSomethingWentWrong: false })
            const user = auth().currentUser;

            // dispatch(getUserSuccess(user))
            // handleLogin(user);
        }).catch(getError => {
            setActivityLoader(false);
            //Code to show errors.
            if (getError.code === 'auth/invalid-credential') {
                setError({ ...error, isPasswordError: true });

            }
            if (getError.code === 'auth/network-request-failed') {
                setError({ ...error, isNetworkError: true });
                console.log(getError);

            }
            if (getError.code === 'auth/invalid-email') {
                setError({ ...error, isInvalidEmail: true });

            }

        })
    }
    const onLoginWithGoogle = () => {
        onGoogleButtonPress().then(
            () => console.log('Signed in with Google!')).catch(
                (error) => {
                    console.log('====================================');
                    console.log(error);
                    console.log('====================================');
                }).catch((error) => {
                    console.log('====================================');
                    console.log(error);
                    console.log('====================================');
                })

    }

    return (


        <LinearGradient colors={['orange', 'white']}
            end={{ x: 1, y: 1 }}
            start={{ x: 0, y: 0 }}>
            {/* //UI for login. */}
            <SafeAreaView style={[style.container]}>

                <View style={[style.setMargin]}>
                    <KeyboardAvoidingView>
                        <ScrollView showsVerticalScrollIndicator={false}>

                            <Text style={[style.text, style.mediumText, style.setMargin]}>Login</Text>

                            {
                                // to handle login with phone.
                                isPhoneLogIn ?
                                    <LoginUsingPhone setPhoneLogin={setPhoneLogin} /> :
                                    <LoginUsingEmail error={error} userCredential={userCredential} setUserCredential={setUserCredential} setError={setError} isChecked={isChecked} setChecked={setChecked} isActivityLoading={isActivityLoading} onLogin={onLogin} setActivityLoader={setActivityLoader} />


                            }
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
                                <Pressable onPress={() => {
                                    setPhoneLogin(true);
                                }}>
                                    {
                                        isPhoneLogIn ? null :
                                            <Image style={[style.profilePic, style.setSpacing]} source={require('../../Assets/Images/phone.png')} />
                                    }
                                </Pressable>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>

            </SafeAreaView >
        </LinearGradient>

    )
}


export default Login;
