import { View, Text, Pressable, ScrollView, ToastAndroid } from "react-native";
import { style } from "../Components/style";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import auth, { } from '@react-native-firebase/auth';
import { ActivityIndicator, TextInput } from "react-native-paper";
import firestore from '@react-native-firebase/firestore';


function SignUp(props: any) {

    //State to manage userinputs and display errors.
    const [signUpData, setSignUpData] = useState({firstName:'',lastName:'',email:'',password:'',confirmPassword:''})
    const [errors, setErrors] = useState({ isEmailErrorForExisting: false, isEmailErrorForInvalid: false, isEmailErrorForEmpty: false, isErrorForPassword: false, isErrorForEmptyPassword: false, isErrorForConfirmPassword: false })
    const [isLoading, setLoading] = useState(false)
    const [isChecked, setChecked] = useState(false);


    //Function for handleing firebase signUp. 
    const onRegister = () => {

        setLoading(true)

        auth().createUserWithEmailAndPassword(signUpData.email, signUpData.password).then((UserCredential) => {
            //After successfull signUp this code will navigate to login screen.
            setSignUpData({...signUpData,email:'',password:''})
            props.navigation.navigate("Login")
            ToastAndroid.show("Account Created!", ToastAndroid.SHORT);

            const user = UserCredential.user;

            user.updateProfile(
                { displayName: `${signUpData.firstName} ${signUpData.lastName}` }
            ).catch((error) => {
                console.log('====================================');
                console.log(error);
                console.log('====================================');
            })


            firestore().collection('User').add({ name: 'shantanu rawade' })
            setLoading(false)



        }).catch(error => {

            //Code to show errors.
            if (error.code === 'auth/email-already-in-use') {
                setErrors({ ...errors, isEmailErrorForExisting: true })
            }
            if (error.code === 'auth/invalid-email') {
                setErrors({ ...error, isEmailErrorForInvalid: true })
            }
            if (error.code === 'auth/weak-password') {
                setErrors({ ...errors, isErrorForPassword: false })
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
                    <TextInput style={style.signUpTextInput} label="First name" value={signUpData.firstName} mode="outlined" onChangeText={(value) => {
                        setSignUpData({...signUpData, firstName: value})
                    }} />
                    {/* Input for Last name.*/}
                    <TextInput style={style.signUpTextInput} label="Last Name" value={signUpData.lastName} mode="outlined" onChangeText={(value) => {
                        setSignUpData({...signUpData, lastName: value})
                    }} />
                    {/* Input for Email.*/}
                    <TextInput style={style.signUpTextInput} label="Email" value={signUpData.email} mode="outlined" onChangeText={(value) => {
                        setSignUpData({...signUpData, email: value})
                        setErrors({ ...errors, isEmailErrorForExisting: false, isEmailErrorForEmpty: false, isEmailErrorForInvalid: false })
                    }} />

                    {/* Error for existing email.*/}
                    {
                        errors.isEmailErrorForExisting ?
                            <Text style={style.errorText}> Entered mail already exists</Text> : null
                    }
                    {
                        errors.isEmailErrorForEmpty ?
                            <Text style={style.errorText}> Mail Id is mandatory. </Text> : null
                    }

                    {/* Error for invalid email.*/}
                    {
                        errors.isEmailErrorForInvalid ?
                            <Text style={style.errorText}> Entered mail is not valid</Text> : null
                    }

                    {/* Input for Password.*/}
                    <TextInput style={style.signUpTextInput} secureTextEntry={!isChecked} label="Password" value={signUpData.password} mode="outlined" onChangeText={(value) => { setSignUpData({...signUpData, password:value}); setErrors({ ...errors, isErrorForPassword: false, isErrorForEmptyPassword: false }) }} />
                    <View style={[style.setRow, { marginTop: 16 }]}>

                        <Pressable style={[{ width: 200, flexDirection: 'row' }]} onPress={() => {
                            setChecked(!isChecked);

                        }}>
                            <Text style={{ width: 18, color: 'white', borderWidth: 1, textAlign: 'center', backgroundColor: isChecked ? '#2596be' : 'white' }}>✓</Text>
                            <Text style={{ flex: 1 }}>  Show password</Text>

                        </Pressable>
                    </View>

                    {
                        errors.isErrorForEmptyPassword ?
                            <Text style={style.errorText}> Enter password</Text> : null
                    }

                    {/* Comfirmation for Password.*/}
                    <TextInput style={style.signUpTextInput} label="Comfirm Password" value={signUpData.confirmPassword} secureTextEntry={!isChecked} mode="outlined" onChangeText={(value) => {
                        setSignUpData({...signUpData, confirmPassword: value})
                    }} />
                    {/* Error for weak password.*/}
                    {
                        errors.isErrorForPassword ?
                            <Text style={style.errorText}> Weak password entered</Text> : null
                    }
                    {
                        errors.isErrorForConfirmPassword ?
                            <Text style={style.errorText}> Password doesn't match</Text> : null
                    }

                    {/* SignUp button.*/}
                    <Pressable onPress={() => {
                        if (signUpData.password !== signUpData.confirmPassword) setErrors({ ...errors, isErrorForConfirmPassword: true })
                        else if (signUpData.email === '' || signUpData.password === '') {
                            if (signUpData.email === '') setErrors({ ...errors, isEmailErrorForEmpty: true })
                            if (signUpData.password === '') setErrors({ ...errors, isErrorForEmptyPassword: true })
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
