import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

/**
 * Imports personalizados.
 */
import { HomeScreen } from "../screens/homeScreen";
import ProfileScreen from "../screens/profileScreen";
import {PulseCameraScreen} from "../screens/pulseCameraScreen";
import colors from "../assets/styles/colors";

const Tab = createBottomTabNavigator();

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
