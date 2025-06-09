/**
 * Bibliotecas de react-native
 */
import React, { use, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Imports personalizados.
 */
import { LoginScreen } from "./src/screens/loginScreen";
import { RegisterScreen } from "./src/screens/registerScreen";
import { MainTabs } from "./src/navigation/mainTabs";
import RespiracionScreen from "./src/screens/respiracionScreen";
import ProfileScreen from "./src/screens/profileScreen";
import AdminScreen from "./src/screens/adminScreen";
import { HeartRateProvider } from "./src/context/HeartRateContext";
import { PulseCameraScreen } from "./src/screens/pulseCameraScreen";

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
  const verificarSesion = async () => {
    console.log("⏳ Verificando sesión...");

    try {
      const userData = await AsyncStorage.getItem('usuario');
      console.log("📦 Datos leídos de AsyncStorage:", userData);

      if (userData !== null) {
        console.log("✅ Sesión activa encontrada.");
        setIsLoggedIn(true);
      } else {
        console.log("❌ No hay sesión activa.");
        setIsLoggedIn(false); // <- ¡Esto es importante!
      }

    } catch (e) {
      console.error("💥 Error leyendo AsyncStorage:", e);
      setIsLoggedIn(false); // <- También aquí, si ocurre error
    } finally {
      console.log("✅ Finalizó verificación de sesión.");
      setIsLoading(false);
    }
  };

  verificarSesion();
}, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <HeartRateProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isLoggedIn ? "MainTabs" : "Login"} screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="AdminScreen" component={AdminScreen} />
          <Stack.Screen name="Respiracion" component={RespiracionScreen} />
          <Stack.Screen name="Pulso" component={PulseCameraScreen} />
          <Stack.Screen name="Perfil" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </HeartRateProvider>
  );
}
