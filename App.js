import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ActivityIndicator, View } from "react-native";

import { AuthProvider, useAuth } from "./src/context/AuthContext";
import { HeartRateProvider } from "./src/context/HeartRateContext";

// Pantallas
import { LoginScreen } from "./src/screens/loginScreen";
import { RegisterScreen } from "./src/screens/registerScreen";
import { MainTabs } from "./src/navigation/mainTabs";
import RespiracionScreen from "./src/screens/respiracionScreen";
import ProfileScreen from "./src/screens/profileScreen";
import AdminScreen from "./src/screens/adminScreen";
import { PulseCameraScreen } from "./src/screens/pulseCameraScreen";
import { GameListScreen } from "./src/screens/GameListScreen";
import { JuegoMemorama } from "./src/screens/Juegos/JuegoMemorama";
import { JuegoCirculo } from "./src/screens/Juegos/JuegoCírculo";
import { PuzzleGameScreen } from "./src/screens/Juegos/PuzzleGameScreen";
import { Iniciojuego } from "./src/screens/Juegos/iniciojuego";
import BookReaderScreens from "./src/screens/Libros/BookReaderScreen";
import YogaExerciseScreen from "./src/screens/yogaExerciseScreen";
import SoundsScreen from "./src/screens/SoundsScreen";
import LibraryScreen from "./src/screens/LibraryScreen";
import { EstadisticasScreen } from "./src/screens/EstadisticasScreen";
import {RespiracionMenu} from "./src/screens/RespiracionMenuScreen";
import { Ejercicio478 } from "./src/screens/Ejercicio478";
import { Ejercicio555 } from "./src/screens/Ejercicio555";
import { EjercicioBoxBreathing } from "./src/screens/EjercicioBoxBreathing";
import { SeleccionarDibujoScreen } from "./src/screens/SeleccionarDibujoScreen";

const Stack = createStackNavigator();

function AppNavigator() {
  const { user, isAuthLoaded } = useAuth();

  if (!isAuthLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={user ? "MainTabs" : "Login"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="AdminScreen" component={AdminScreen} />
        <Stack.Screen name="RespiracionScreen" component={RespiracionScreen} />
        <Stack.Screen name="Ejercicios" component={YogaExerciseScreen} />
        <Stack.Screen name="Sonidos" component={SoundsScreen} />
        <Stack.Screen name="Biblioteca" component={LibraryScreen} />
        <Stack.Screen name="GameListScreen" component={GameListScreen} />
        <Stack.Screen name="Pulso" component={PulseCameraScreen} />
        <Stack.Screen name="Perfil" component={ProfileScreen} />
        <Stack.Screen name="Rompecabezas" component={PuzzleGameScreen} />
        <Stack.Screen name="ListaDeJuegos" component={GameListScreen} />
        <Stack.Screen name="JuegoMemorama" component={JuegoMemorama} />
        <Stack.Screen name="JuegoCírculo" component={JuegoCirculo} />
        <Stack.Screen name="InicioJuego" component={Iniciojuego} />
        <Stack.Screen name="BookReader" component={BookReaderScreens} />
        <Stack.Screen name="Estadisticas" component={EstadisticasScreen} />
        <Stack.Screen name="RespiracionMenu" component={RespiracionMenu} />
        <Stack.Screen name="Ejercicio478" component={Ejercicio478} />
        <Stack.Screen name="Ejercicio555" component={Ejercicio555} />
        <Stack.Screen name="EjercicioBoxBreathing" component={EjercicioBoxBreathing} />
        <Stack.Screen name="SeleccionarDibujo" component={SeleccionarDibujoScreen} />
        
        {/* Agrega más pantallas según sea necesario */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <HeartRateProvider>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </HeartRateProvider>
  );
}
