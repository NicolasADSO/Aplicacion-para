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
import { GameListScreen } from "./src/screens/GameListScreen";
import { JuegoMemorama } from "./src/screens/Juegos/JuegoMemorama";
import {  JuegoColorear } from "./src/screens/Juegos/JuegoColorear";
import {   JuegoCírculo } from "./src/screens/Juegos/JuegoCírculo";
import { PuzzleGameScreen } from "./src/screens/Juegos/PuzzleGameScreen";
import { Iniciojuego } from "./src/screens/Juegos/iniciojuego";
import BookReaderScreens from "./src/screens/Libros/BookReaderScreen";
import YogaExerciseScreen from "./src/screens/yogaExerciseScreen";
import SoundsScreen from "./src/screens/SoundsScreen";
import LibraryScreen from "./src/screens/LibraryScreen";




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
          <Stack.Screen name="Ejercicios" component={YogaExerciseScreen} />
          <Stack.Screen name="Sonidos" component={SoundsScreen} />
          <Stack.Screen name="Biblioteca" component={LibraryScreen} />
          <Stack.Screen name="GameListScreen" component={GameListScreen} />
          <Stack.Screen name="Pulso" component={PulseCameraScreen} />
          <Stack.Screen name="Perfil" component={ProfileScreen} />
          <Stack.Screen name="Rompecabezas" component={PuzzleGameScreen} />
          <Stack.Screen name="ListaDeJuegos" component={GameListScreen} />
          <Stack.Screen name="JuegoMemorama" component={JuegoMemorama} />
          <Stack.Screen name="JuegoColorear" component={JuegoColorear} />
          <Stack.Screen name="JuegoCírculo" component={JuegoCírculo} />
          <Stack.Screen name="InicioJuego" component={Iniciojuego} />
          <Stack.Screen name="BookReader" component={BookReaderScreens} />
        </Stack.Navigator>
      </NavigationContainer>
    </HeartRateProvider>
  );
}
