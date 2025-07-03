import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";

import { HomeScreen } from "../screens/homeScreen";
import ProfileScreen from "../screens/profileScreen";
import {PulseCameraScreen} from "../screens/pulseCameraScreen";
import colors from "../assets/styles/colors";

import { RespiracionMenu } from "../screens/RespiracionMenuScreen";
import { Ejercicio478 } from "../screens/Ejercicio478";
import { Ejercicio555 } from "../screens/Ejercicio555";
import { EjercicioBoxBreathing } from "../screens/EjercicioBoxBreathing";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function RespiracionStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RespiracionMenu" component={RespiracionMenu} />
      <Stack.Screen name="RespiracionScreen" component={RespiracionScreen} />
      <Stack.Screen name="Ejercicio478" component={Ejercicio478} />
      <Stack.Screen name="Ejercicio555" component={Ejercicio555} />
      <Stack.Screen name="EjercicioBoxBreathing" component={EjercicioBoxBreathing} />
    </Stack.Navigator>
  );
}

export const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Pulso') iconName = 'favorite';
          else if (route.name === 'Ejercicios') iconName = 'fitness-center';
          else if (route.name === 'Respiracion') iconName = 'air';
          else if (route.name === 'Sonidos') iconName = 'music-note';
          else if (route.name === 'Biblioteca') iconName = 'menu-book';
          else if (route.name === 'Perfil') iconName = 'person';
          else if (route.name === 'Juegos') iconName = 'extension';
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: colors.secondary,
        tabBarStyle: { backgroundColor: colors.primary }
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Pulso" component={PulseCameraScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
