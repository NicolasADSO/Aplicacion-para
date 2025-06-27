// ✅ Versión con selección de avatar desde galería de avatares predefinidos + opción de cambiar avatar

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  LayoutAnimation,
  UIManager,
  Platform,
  Share,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { BlurView } from 'expo-blur';
import { FlatList } from 'react-native';
import { avatarMap } from '../context/avatarMap';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  obtenerPuntuacionesMemorama,
  obtenerPuntuacionesRompecabezas,
  obtenerPuntuacionesRespiracion,
  obtenerSesionesYoga,
  actualizarAvatarUsuario,
  obtenerAvatarUsuario,
} from '../services/authService';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const avatarList = Object.entries(avatarMap);

export default function ProfileScreen({ navigation }) {
  const { user, setUser } = useAuth();
  const [puntuacionesMemorama, setPuntuacionesMemorama] = useState([]);
  const [puntuacionesRompecabezas, setPuntuacionesRompecabezas] = useState([]);
  const [puntuacionesRespiracion, setPuntuacionesRespiracion] = useState([]);
  const [puntuacionesYoga, setPuntuacionesYoga] = useState([]);
  const [showAllMemorama, setShowAllMemorama] = useState(false);
  const [showAllRompecabezas, setShowAllRompecabezas] = useState(false);
  const [avatarUri, setAvatarUri] = useState(null);
  const [avatarSeleccionado, setAvatarSeleccionado] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");
  

  useFocusEffect(
    useCallback(() => {
      cargarPuntuacionesMemorama();
      cargarPuntuacionesRompecabezas();
      cargarPuntuacionesRespiracion();
      cargarSesionesYoga();
      cargarAvatar();
    }, [user])
  );

  const cargarAvatar = async () => {
  try {
    const nombreArchivo = await AsyncStorage.getItem('avatar_uri');
    if (nombreArchivo && avatarMap[nombreArchivo]) {
      const uri = Image.resolveAssetSource(avatarMap[nombreArchivo]).uri;
      setAvatarUri(uri);
      setAvatarSeleccionado(true);
      console.log('✅ Avatar cargado desde AsyncStorage:', nombreArchivo);
    } else {
      setAvatarUri(null);
      setAvatarSeleccionado(false);
      console.log('🔄 Avatar no encontrado, usando predeterminado.');
    }
  } catch (error) {
    console.error('❌ Error cargando avatar desde AsyncStorage:', error);
  }
};


  const seleccionarAvatar = async (nombreArchivo) => {
  const imagen = avatarMap[nombreArchivo];
  const uri = Image.resolveAssetSource(imagen).uri;

  // Mostrar avatar inmediatamente
  setAvatarUri(uri);
  setAvatarSeleccionado(true);

  // Guardar en AsyncStorage
  await AsyncStorage.setItem('avatar_uri', nombreArchivo);

  // Actualizar también el usuario local del contexto
  if (user?.id) {
    const usuarioActualizado = {
      ...user,
      avatar_uri: nombreArchivo,
    };
    setUser(usuarioActualizado);
    await AsyncStorage.setItem('usuario', JSON.stringify(usuarioActualizado));

    console.log('✅ Avatar guardado localmente:', nombreArchivo);
    setMensajeExito('Avatar actualizado con éxito 🎉');
    setTimeout(() => setMensajeExito(''), 3000);
  }
};



  const reiniciarAvatar = async () => {
  try {
    await AsyncStorage.removeItem('avatar_uri');
    
    if (user?.id) {
      const usuarioActualizado = {
        ...user,
        avatar_uri: null,
      };
      setUser(usuarioActualizado);
      await AsyncStorage.setItem('usuario', JSON.stringify(usuarioActualizado));
    }

    setAvatarUri(null);
    setAvatarSeleccionado(false);

    console.log("🔄 Avatar reiniciado localmente.");
  } catch (error) {
    console.error("❌ Error al reiniciar avatar:", error);
  }
};


  // ... resto del código permanece igual ...
  const cargarPuntuacionesMemorama = async () => {
    if (!user?.id) return;
    const resultados = await obtenerPuntuacionesMemorama(user.id);
    setPuntuacionesMemorama(resultados);
  };

  const cargarPuntuacionesRompecabezas = async () => {
    if (!user?.id) return;
    const resultados = await obtenerPuntuacionesRompecabezas(user.id);
    setPuntuacionesRompecabezas(resultados);
  };

  const cargarPuntuacionesRespiracion = async () => {
    if (!user?.id) return;
    const datos = await obtenerPuntuacionesRespiracion(user.id);
    setPuntuacionesRespiracion(datos);
  };

  const cargarSesionesYoga = async () => {
    if (!user?.id) return;
    const sesiones = await obtenerSesionesYoga(user.id);
    setPuntuacionesYoga(sesiones);
  };

  const calcularPromedio = (lista) => {
    if (lista.length === 0) return 0;
    const total = lista.reduce((sum, p) => sum + p.puntaje, 0);
    return (total / lista.length).toFixed(2);
  };

  const calcularPromedioTiempo = (lista) => {
    if (lista.length === 0) return 0;
    const total = lista.reduce((sum, p) => sum + (p.tiempo_restante || 0), 0);
    return Math.floor(total / lista.length);
  };

  const compartirMejorPuntaje = async () => {
    const mejorMemorama = Math.max(...puntuacionesMemorama.map(p => p.puntaje));
    const mejorRompe = Math.max(...puntuacionesRompecabezas.map(p => p.puntaje));
    const mensaje = `¡Hola! Mi mejor puntaje en Memorama es ${mejorMemorama} y en Rompecabezas es ${mejorRompe}. ¿Puedes superarlo? 🧠🎯`;
    try {
      await Share.share({ message: mensaje });
    } catch (error) {
      console.error('Error al compartir:', error);
    }
  };

  const promedioMemorama = calcularPromedio(puntuacionesMemorama);
  const promedioRompecabezas = calcularPromedio(puntuacionesRompecabezas);
  const tiempoPromedioMemorama = calcularPromedioTiempo(puntuacionesMemorama);
  const tiempoPromedioRompecabezas = calcularPromedioTiempo(puntuacionesRompecabezas);

  const renderPuntuaciones = (puntuaciones, showAll, toggleShowAll) => (
    <>
      {puntuaciones.slice(0, showAll ? puntuaciones.length : 3).map((p, index) => (
        <View key={index} style={styles.scoreItem}>
          <Text style={styles.scoreText}>🎯 Dificultad: {p.dificultad}</Text>
          <Text style={styles.scoreText}>⭐ Puntaje: {p.puntaje}</Text>
          <Text style={styles.scoreText}>⏱ Tiempo restante: {p.tiempo_restante}s</Text>
          <Text style={styles.scoreDate}>📅 {new Date(p.created_at).toLocaleString()}</Text>
        </View>
      ))}
      {puntuaciones.length > 3 && (
        <TouchableOpacity onPress={toggleShowAll} style={styles.verMasButton}>
          <Text style={styles.verMasText}>{showAll ? 'Ver menos' : 'Ver más'}</Text>
        </TouchableOpacity>
      )}
    </>
  );

  return (
    <LinearGradient colors={['#141E30', '#243B55']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <Image
            source={avatarUri ? { uri: avatarUri } : require('../assets/avatars/avatar1.avif')}
            style={styles.avatar}
          />
          {mensajeExito !== '' && (
            <View style={styles.toast}>
              <Text style={styles.toastText}>{mensajeExito}</Text>
            </View>
          )}

          {!avatarSeleccionado && (
            <FlatList
              data={avatarList}
              keyExtractor={([nombre]) => nombre}
              horizontal
              renderItem={({ item: [nombre, imagen] }) => (
                <TouchableOpacity onPress={() => seleccionarAvatar(nombre)} style={{ marginHorizontal: 6 }}>
                  <Image
                    source={imagen}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                      borderWidth: 2,
                      borderColor: avatarUri?.includes(nombre) ? '#56CCF2' : 'transparent',
                    }}
                  />
                </TouchableOpacity>
              )}
            />
          )}

          {avatarSeleccionado && (
            <TouchableOpacity onPress={reiniciarAvatar} style={styles.changeAvatarButton}>
              <Text style={styles.changeAvatarText}>Cambiar avatar</Text>
            </TouchableOpacity>
          )}

          <Text style={styles.username}>Hola, {user?.nombre || 'Usuario'} 👋</Text>
          <Text style={styles.subtitle}>Tus estadísticas de bienestar</Text>
        </View>

        {/* Resto del código permanece igual */}
         {/* El resto permanece igual */}
        <BlurView intensity={40} tint="light" style={styles.statsCard}>
          <View style={styles.statItem}>
            <MaterialIcons name="check-circle" size={28} color="#56CCF2" />
            <View style={styles.statTextWrapper}>
              <Text style={styles.statTitle}>Sesiones completadas</Text>
              <Text style={styles.statValue}>{puntuacionesMemorama.length + puntuacionesRompecabezas.length}</Text>
            </View>
          </View>
          <View style={styles.statItem}>
            <MaterialIcons name="self-improvement" size={28} color="#56CCF2" />
            <View style={styles.statTextWrapper}>
              <Text style={styles.statTitle}>Actividad favorita</Text>
              <Text style={styles.statValue}>Memorama</Text>
            </View>
          </View>
        </BlurView>

        <TouchableOpacity style={styles.shareButton} onPress={compartirMejorPuntaje}>
          <FontAwesome5 name="share-square" size={18} color="#fff" />
          <Text style={styles.logoutText}>Compartir mis puntajes</Text>
        </TouchableOpacity>

        <View style={styles.scoresCard}>
          <Text style={styles.sectionTitle}>🧠 Memorama</Text>
          <Text style={styles.statValue}>Promedio: {promedioMemorama}</Text>
          {promedioMemorama > 80 && <Text style={styles.mejoradoText}>🎉 ¡Has mejorado tu promedio en Memorama!</Text>}
          {puntuacionesMemorama.length === 0 ? (
            <Text style={styles.noScores}>No hay puntuaciones aún.</Text>
          ) : (
            renderPuntuaciones(puntuacionesMemorama, showAllMemorama, () => setShowAllMemorama(!showAllMemorama))
          )}
        </View>

        <View style={styles.scoresCard}>
          <Text style={styles.sectionTitle}>🧩 Rompecabezas</Text>
          <Text style={styles.statValue}>Promedio: {promedioRompecabezas}</Text>
          {promedioRompecabezas > 80 && <Text style={styles.mejoradoText}>🎯 ¡Gran progreso en Rompecabezas!</Text>}
          {puntuacionesRompecabezas.length === 0 ? (
            <Text style={styles.noScores}>No hay puntuaciones aún.</Text>
          ) : (
            renderPuntuaciones(puntuacionesRompecabezas, showAllRompecabezas, () => setShowAllRompecabezas(!showAllRompecabezas))
          )}
        </View>

        <View style={styles.scoresCard}>
          <Text style={styles.sectionTitle}>🌬️ Respiración</Text>
          {puntuacionesRespiracion.length === 0 ? (
            <Text style={styles.noScores}>No hay sesiones aún.</Text>
          ) : (
            puntuacionesRespiracion.slice(0, 3).map((p, index) => (
              <View key={index} style={styles.scoreItem}>
                <Text style={styles.scoreText}>🕒 Duración: {p.duracion} segundos</Text>
                <Text style={styles.scoreDate}>📅 {new Date(p.created_at).toLocaleString()}</Text>
              </View>
            ))
          )}
        </View>

        <View style={styles.scoresCard}>
          <Text style={styles.sectionTitle}>🧘 Yoga</Text>
          {puntuacionesYoga.length === 0 ? (
            <Text style={styles.noScores}>No hay sesiones aún.</Text>
          ) : (
            puntuacionesYoga.slice(0, 3).map((p, index) => (
              <View key={index} style={styles.scoreItem}>
                <Text style={styles.scoreText}>🕒 Duración: {p.duracion} segundos</Text>
                <Text style={styles.scoreDate}>📅 {new Date(p.created_at).toLocaleString()}</Text>
              </View>
            ))
          )}
        </View>

        <TouchableOpacity style={styles.detailButton} onPress={() => navigation.navigate('Estadisticas')}>
          <MaterialIcons name="bar-chart" size={22} color="#fff" />
          <Text style={styles.logoutText}>Ver estadísticas detalladas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.replace('Login')}>
          <MaterialIcons name="logout" size={22} color="#fff" />
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 20 },
  scrollContent: { paddingBottom: 40 },
  profileHeader: { alignItems: 'center', marginBottom: 20 },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#56CCF2',
    marginBottom: 12,
  },
  username: { fontSize: 26, fontWeight: 'bold', color: '#fff' },
  subtitle: { fontSize: 14, color: '#ccc', marginTop: 4 },
  statsCard: {
    borderRadius: 20,
    padding: 24,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginBottom: 20,
  },
  statItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  statTextWrapper: { marginLeft: 14 },
  statTitle: { fontSize: 14, color: '#ddd' },
  statValue: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  mejoradoText: { color: '#56FF9F', fontWeight: 'bold', marginTop: 6 },
  scoresCard: {
    backgroundColor: '#ffffff11',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  scoreItem: {
    marginBottom: 12,
    borderBottomWidth: 1,
    borderColor: '#ffffff22',
    paddingBottom: 10,
  },
  scoreText: { color: '#eee', fontSize: 14 },
  scoreDate: { color: '#aaa', fontSize: 12, marginTop: 4 },
  noScores: { color: '#aaa', fontStyle: 'italic' },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#56CCF2',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: { color: '#fff', fontSize: 16, fontWeight: '600', marginLeft: 8 },
  verMasButton: { alignItems: 'center', marginTop: 10 },
  verMasText: { color: '#56CCF2', fontWeight: '600' },
  detailButton: {
    flexDirection: 'row',
    backgroundColor: '#56CCF2',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  shareButton: {
    flexDirection: 'row',
    backgroundColor: '#27AE60',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  changeAvatarButton: {
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#ffffff22',
  },
  changeAvatarText: {
    color: '#56CCF2',
    fontWeight: '600',
    fontSize: 14,
  },
  toast: {
  position: 'absolute',
  top: 30,
  left: 20,
  right: 20,
  padding: 12,
  backgroundColor: '#2ecc71',
  borderRadius: 10,
  zIndex: 999,
  alignItems: 'center',
},
toastText: {
  color: '#fff',
  fontWeight: 'bold',
},
});

// ... estilos sin cambios ...
