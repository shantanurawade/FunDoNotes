import { View, Text, Pressable, Image, KeyboardAvoidingView, ScrollView, Switch } from "react-native";
import { style } from "../../Styles/style";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import auth from '@react-native-firebase/auth';
import LinearGradient from "react-native-linear-gradient";
import LoginUsingEmail from "./LoginUsingEmail";
import LoginUsingPhone from "./LoginUsingPhone";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../Redux/action";
import { RootState } from "../../Redux/store";
import { onGoogleButtonPress, onLoginWithGoogle } from "./utils/onGoogleButtonPress";


function Login(props: any) {

    const isDarkTheme = useSelector((store: RootState) => store.themeState.isDarkTheme);
    //State to manage userinputs and display errors. 
    const [userCredential, setUserCredential] = useState({ email: '', password: '' });
    const [isPhoneLogIn, setPhoneLogin] = useState(false);
    const [isChecked, setChecked] = useState(false);
    const [error, setError] = useState({ isInvalidEmail: false, isPasswordError: false, isNetworkError: false, isSomethingWentWrong: false });
    const [isActivityLoading, setActivityLoader] = useState(false);
    const dispatch = useDispatch();


    //Function for handleing firebase signIn. 
    const onLogin = (email: any, password: any) => {
        setActivityLoader(true);
        auth().signInWithEmailAndPassword(email, password).then(() => {

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
   

    return (

        <LinearGradient colors={['orange', isDarkTheme ? 'black' : 'white']}
            end={{ x: .8, y: .8 }}
            start={{ x: 0, y: 0 }}>
            {/* //UI for login. */}
            <SafeAreaView style={[style.container]}>
                <View style={[style.setMargin]}>
                    <KeyboardAvoidingView>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text>Dark Mode -</Text>
                                <Switch
                                    style={{ alignSelf: 'flex-start' }}
                                    value={isDarkTheme}
                                    onValueChange={() => {
                                        dispatch(toggleTheme());
                                    }} />
                            </View>
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
                                <Text style={[style.smallText, style.setPadding, { color: isDarkTheme ? 'white' : 'black' }]}>Login with : </Text>
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
