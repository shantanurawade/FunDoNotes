import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AutheticationScreen from './src/Screens/Login/AutheticationScreen';
import MainScreen from './src/Screens/MainScreen';

//Stack varible which used to store and use "createNativeStackNavigator". 
const Stack = createNativeStackNavigator();

function App() {

  return (

    //Used to store navigation, should be only one in the project. 
    <NavigationContainer>

      {/* Defining navigation as a stack navigation */}
      <Stack.Navigator>

        {/* Screens to be displayed in navigation */}
        {/* Name and components is the mandatory attributes*/}
        <Stack.Screen name='AutheticationScreen' component={AutheticationScreen} options={{ headerShown: false }} />
        <Stack.Screen name='MainScreen' component={MainScreen} options={{ headerShown: false }} />

      </Stack.Navigator>

    </NavigationContainer>
  )
}


export default App;