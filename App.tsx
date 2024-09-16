import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AutheticationScreen from './src/Screens/Authentication/AuthenticationScreen';
import MainScreen from './src/Screens/MainScreen';
import { initializeApp } from "firebase/app";
import firebase from '@react-native-firebase/app';
import { Provider } from 'react-redux';
// import store from './src/Redux/store';




// Firebase configuration (from `google-services.json`)
const firebaseConfig = {
  apiKey: "AIzaSyAO2nxCvTN2mpjTaUh3ybKhAerJFXDQY8I",
  authDomain: "com.fundonote.app",
  projectId: "fun-do-notes-5b6e2",
  storageBucket: "fun-do-notes-5b6e2.appspot.com",
  messagingSenderId: "799467742576",
  appId: "1:799467742576:android:8a28ff037c89df100fdbb5",
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

//Stack varible which used to store and use "createNativeStackNavigator". 
const Stack = createNativeStackNavigator();

function App() {

  useEffect(() => {
    initializeApp(firebaseConfig);
  },[])
  return (

    
    <NavigationContainer>

    
      {/* Defining navigation as a stack navigation */}
      <Stack.Navigator>

        {/* Screens to be displayed in navigation */}
        {/* Name and components is the mandatory attributes*/}
        <Stack.Screen name='AuthenticationScreen' component={AutheticationScreen} options={{ headerShown: false }} />
        <Stack.Screen name='MainScreen' component={MainScreen} options={{ headerShown: false }} />

      </Stack.Navigator>

    </NavigationContainer>
  )
}


export default App;