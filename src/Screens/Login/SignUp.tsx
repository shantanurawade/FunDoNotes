import { View, Text, Pressable, ScrollView, ToastAndroid } from "react-native";
import { style } from "../Components/style";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import auth, {  } from '@react-native-firebase/auth';
import { ActivityIndicator, TextInput } from "react-native-paper";
import firestore from '@react-native-firebase/firestore';
import { UserCredential } from "firebase/auth";



function SignUp(props: any) {

    //State to manage userinputs and display errors.
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [confirmPassword, setConfirmPassword] = useState('');
    const [isEmailErrorForExisting, setEmailErrorForExisting] = useState(false)
    const [isEmailErrorForInvalid, setEmailErrorForInvalid] = useState(false)
    const [isEmailErrorForEmpty, setEmailErrorForEmpty] = useState(false)
    const [isErrorForPassword, setErrorForPassword] = useState(false)
    const [isErrorForEmptyPassword, setErrorForEmptyPassword] = useState(false)
    const [isErrorForConfirmPassword, setErrorForConfirmPassword] = useState(false)
    const [isLoading, setLoading] = useState(false)

    //Function for handleing firebase signUp. 
    const onRegister = () => {

        setLoading(true)

        auth().createUserWithEmailAndPassword(email, password).then((UserCredential) => {
            //After successfull signUp this code will navigate to login screen.
            setEmail('');
            setPassword('')
            props.navigation.navigate("Login")
            ToastAndroid.show("Account Created!", ToastAndroid.SHORT);

            const user = UserCredential.user;

            user.updateProfile(
                {displayName: `${firstName} ${lastName}`}
            ).catch((error)=>{
                console.log('====================================');
                console.log(error);
                console.log('====================================');
            })

            
            firestore().collection('User').add({ name: 'shantanu rawade' })
            setLoading(false)

            
            
        }).catch(error => {

            //Code to show errors.
            if (error.code === 'auth/email-already-in-use') {
                setEmailErrorForExisting(true);
            }
            if (error.code === 'auth/invalid-email') {
                setEmailErrorForInvalid(true);
            }
            if (error.code === 'auth/weak-password') {
                setErrorForPassword(true);
            }
            setLoading(false)

        })
    }

    return (

        //UI for signUp.
        <SafeAreaView style={[style.container, style.setFlex1]}>
            <ScrollView>
                <View style={style.setMargin}>
                    
                    <Text style={[style.mediumText, style.text]}>Registration</Text>

                    {/* Input for First Name.*/}
                    <TextInput style={style.signUpTextInput} label="First name" value={firstName} mode="outlined" onChangeText={(value) => {
                        setFirstName(value);
                    }} />
                    {/* Input for Last name.*/}
                    <TextInput style={style.signUpTextInput} label="Last Name" value={lastName} mode="outlined" onChangeText={(value) => {
                        setLastName(value);
                    }} />
                    {/* Input for Email.*/}
                    <TextInput style={style.signUpTextInput} label="Email" value={email} mode="outlined" onChangeText={(value) => {
                        setEmail(value);
                        setEmailErrorForExisting(false);
                        setEmailErrorForEmpty(false)
                        setEmailErrorForInvalid(false)
                    }} />

                    {/* Error for existing email.*/}
                    {
                        isEmailErrorForExisting ?
                            <Text style={style.errorText}> Entered mail already exists</Text> : null
                    }
                    {
                        isEmailErrorForEmpty ?
                            <Text style={style.errorText}> Mail Id is mandatory. </Text> : null
                    }

                    {/* Error for invalid email.*/}
                    {
                        isEmailErrorForInvalid ?
                            <Text style={style.errorText}> Entered mail is not valid</Text> : null
                    }

                    {/* Input for Password.*/}
                    <TextInput style={style.signUpTextInput} label="Password" value={password} mode="outlined" onChangeText={(value) => { setPassword(value); setErrorForPassword(false); setErrorForEmptyPassword(false) }} />


                    {
                        isErrorForEmptyPassword ?
                            <Text style={style.errorText}> Enter password</Text> : null
                    }

                    {/* Comfirmation for Password.*/}
                    <TextInput style={style.signUpTextInput} label="Comfirm Password" value={confirmPassword} mode="outlined" onChangeText={(value) => {
                        setConfirmPassword(value);
                    }} />
                    {/* Error for weak password.*/}
                    {
                        isErrorForPassword ?
                            <Text style={style.errorText}> Weak password entered</Text> : null
                    }
                    {
                        isErrorForConfirmPassword ?
                            <Text style={style.errorText}> Password doesn't match</Text> : null
                    }

                    {/* SignUp button.*/}
                    <Pressable onPress={() => {
                        if (password !== confirmPassword) setErrorForConfirmPassword(true);
                        else if (email === '' || password === '') {
                            if (email === '') setEmailErrorForEmpty(true)
                            if (password === '') setErrorForEmptyPassword(true)
                        }
                        else onRegister();
                    }}
                        style={[style.container, style.button, style.setMarginTop]}>
                        {isLoading ?
                            <ActivityIndicator size='small' color="#00ff00" /> : <Text style={[style.text, style.smallText]}>SignUp</Text>
                        }

                    </Pressable>

                    {/* Navigate to Login Screen.*/}
                    <Pressable onPress={() => { props.navigation.navigate("Login") }}>
                        <Text style={[style.text, style.smallText, style.setPadding, style.linkText]}>Login</Text>
                    </Pressable>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


export default SignUp;
