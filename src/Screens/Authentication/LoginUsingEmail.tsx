import { View, Text, Pressable, ActivityIndicator } from 'react-native'
import { TextInput } from 'react-native-paper';
import React from 'react'
import { style } from "../../Styles/style";
import { useForm } from '../../utility/util';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';

const LoginUsingEmail = (props: any) => {

    const error = props.error;
    const userCredential = props.userCredential;
    const setUserCredential = props.setUserCredential;
    const setError = props.setError;
    const isChecked = props.isChecked;
    const setChecked = props.setChecked;
    const isActivityLoading = props.isActivityLoading;
    const onLogin = props.onLogin;
    const { values, handleChange } = useForm({ email: '', password: '' })
    const isDarkTheme = useSelector((store: RootState) => store.themeState.isDarkTheme)
    return (

        <View>
            {/* Input for Email.*/}
            <TextInput
                style={{ marginTop: 10, marginBottom: 10 }}
                label="Email"
                value={values.email}
                mode="outlined"
                onChangeText={(text) => {
                    // setUserCredential({ ...userCredential, email: value });
                    handleChange("email", text)
                    setError({ ...error, isInvalidEmail: false })
                }}>

            </TextInput>

            {/* Error for invalid email.*/}
            {
                error.isInvalidEmail ?
                    <Text style={{ color: 'red' }}> Entered mail is not valid</Text> : null
            }

            {/* Input for Password.*/}

            <TextInput
                style={{ marginTop: 10 }}
                label="Password"
                value={values.password}
                secureTextEntry={!isChecked}
                mode="outlined"
                onChangeText={(text) => {
                    handleChange("password", text);
                    // setUserCredential({ ...userCredential, password: value });
                    setError({ ...error, isPasswordError: false })
                }} />
            <View style={[style.setRow, { marginTop: 16 }]}>

                <Pressable style={[{ width: 200, flexDirection: 'row' }]} onPress={() => {
                    setChecked(!isChecked);

                }}>
                    <Text style={{ width: 18, color: 'white', borderWidth: 1, textAlign: 'center', backgroundColor: isChecked ? '#2596be' : 'white' }}>✓</Text>
                    <Text style={{ flex: 1, color: isDarkTheme ? 'white' : 'black' }}>  Show password</Text>

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
            {
                error.isSomethingWentWrong ?
                    <Text style={{ color: 'red' }}> Somthing went wrong please try again.</Text> : null
            }

            {/* Login button.*/}
            <Pressable
                onPress={() => {
                    if (values.email != '' && values.password != '') onLogin(values.email, values.password);
                    else setError({ ...error, isPasswordError: true })
                }}

                style={[style.container, style.button, style.setMarginTop]}>
                {isActivityLoading ? <ActivityIndicator size='large' color='#00ff00' /> :
                    <Text style={[style.text, style.smallText]}>Login</Text>}
            </Pressable>

        </View >

    )
}

export default LoginUsingEmail