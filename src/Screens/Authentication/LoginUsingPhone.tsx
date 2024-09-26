import { View, Pressable, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-paper';
import { style } from '../Components/style';

const LoginUsingPhone = (props: any) => {

    const [isOtp, setOtp] = useState(false)
    const [timer, setTimer] = useState(5)
    const [resend, setResend] = useState(false);
    const [isDisabled, setDisable] = useState(true);

    useEffect(() => {

        if (timer > 0)
            setTimeout(() => {
                setTimer(timer - 1)
            }, 1000)
        else {setResend(true); setDisable(false)}
    }, [timer])
    const setPhoneLogin = props.setPhoneLogin;
    return (


        <View>
            <TextInput style={{ marginTop: 10, marginBottom: 10 }} label="Phone" mode="outlined" ></TextInput>
            {
                isOtp ?
                    <View>
                        <TextInput style={{ marginTop: 10, marginBottom: 10 }} label="Enter otp" mode="outlined" ></TextInput>

                        <Pressable disabled={isDisabled}  onPress={() => { setResend(false); setDisable(true); setTimer(30) }}>
                            <Text style={{ textAlign: 'right', color: resend ? '#2596be' : 'grey' }}>Resend otp
                                <Text> 00:{timer}</Text>
                            </Text>
                        </Pressable>
                    </View>
                    :
                    null}

            {
                isOtp ?

                    <Pressable onPress={() => { setOtp(true) }}
                        style={[style.container, style.button, style.setMarginTop]}>

                        <Text style={[style.text, style.smallText]}> Verify otp</Text>
                    </Pressable>
                    :
                    <Pressable onPress={() => { setOtp(true) }}
                        style={[style.container, style.button, style.setMarginTop]}>

                        <Text style={[style.text, style.smallText]}> Get otp</Text>
                    </Pressable>
            }
            <Pressable onPress={() => setPhoneLogin(false)}>
                <Text style={[{ color: '#2596be', textAlign: 'center' }]}>Login with email</Text>
            </Pressable>
        </View>
    )
}

export default LoginUsingPhone;