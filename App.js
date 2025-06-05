/**
 * Bibliotecas de react-native
 */
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


/**
 * Imports personalizados.
 */
import { LoginScreen } from "./src/screens/loginScreen";
import { RegisterScreen } from "./src/screens/registerScreen";
import { MainTabs } from  "./src/navigation/mainTabs";
import RespiracionScreen from "./src/screens/respiracionScreen";
import ProfileScreen from "./src/screens/profileScreen";
import AdminScreen from "./src/screens/adminScreen";
import { HeartRateProvider } from "./src/context/HeartRateContext";


const Stack = createStackNavigator();

export default function App(){
  return(
    <HeartRateProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={LoginScreen}/>
          <Stack.Screen name="Register" component={RegisterScreen}/>
          <Stack.Screen name="MainTabs" component={MainTabs}/>
          <Stack.Screen name="AdminScreen" component={AdminScreen}/>
          <Stack.Screen name="Respiracion" component={RespiracionScreen}/>
          <Stack.Screen name="Perfil" component={ProfileScreen}/>

        </Stack.Navigator>
      </NavigationContainer>
    </HeartRateProvider>
  )
}
