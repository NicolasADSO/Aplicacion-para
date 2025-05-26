import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './screens/loginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import YogaExerciseScreen from './screens/YogaExerciseScreen';
import SoundsScreen from './screens/SoundsScreen';
import RespiracionScreen from './screens/respiracionScreen';
import ProfileScreen from './screens/profileScreen';
import LibraryScreen from './screens/LibraryScreen';
import BreathingGameScreen from './screens/BreathingGameScreen';
import HistoriaClinicaScreen from './screens/HistoriaClinicaScreen';
import AdminScreen from './screens/AdminScreen';
import { MaterialIcons } from '@expo/vector-icons';
import colors from './styles/colors';

// Importar el Context de Heart Rate
import { HeartRateProvider } from './contexts/HeartRateContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Ejercicios') iconName = 'fitness-center';
          else if (route.name === 'Respiración') iconName = 'air';
          else if (route.name === 'Sonidos') iconName = 'music-note';
          else if (route.name === 'Biblioteca') iconName = 'menu-book';
          else if (route.name === 'Historial') iconName = 'library-books';
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: colors.accent,
        tabBarStyle: { backgroundColor: colors.primary },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Ejercicios" component={YogaExerciseScreen} />
      <Tab.Screen name="Respiración" component={RespiracionScreen} />
      <Tab.Screen name="Sonidos" component={SoundsScreen} />
      <Tab.Screen name="Biblioteca" component={LibraryScreen} />
      <Tab.Screen name="Historial" component={HistoriaClinicaScreen} /> 
    </Tab.Navigator>
  );
}

export default function App() {
  const [role, setRole] = useState(null);

  const handleRoleBasedNavigation = () => {
    if (role === 'admin') {
      return 'AdminScreen';
    }
    return 'MainTabs';
  };

  return (
    <HeartRateProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name={handleRoleBasedNavigation()} component={MainTabs} />  
          <Stack.Screen name="Respiracion" component={BreathingGameScreen} />
          <Stack.Screen name="Perfil" component={ProfileScreen} />
          <Stack.Screen name="AdminScreen" component={AdminScreen} /> 
        </Stack.Navigator>
      </NavigationContainer>
    </HeartRateProvider>
  );
}