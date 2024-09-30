import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Login";
import SignUp from './SignUp';


//Stack varible which used to store and use "createNativeStackNavigator".
const Stack = createNativeStackNavigator();

export default function Authetication() {

    return (

        // Defining navigation as a stack navigation 
        <Stack.Navigator>
            {/* Screens to be displayed in navigation */}
            {/* Name and components is the mandatory attributes*/}
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
    )
}