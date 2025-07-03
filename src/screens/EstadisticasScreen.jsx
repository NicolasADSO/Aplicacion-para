// EstadisticasScreen.jsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useAuth } from '.././context/AuthContext';
import {
  obtenerPuntuacionesMemorama,
  obtenerPuntuacionesRompecabezas,
  obtenerPuntuacionesRespiracion,
  obtenerSesionesYoga,
} from '../services/authService';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width - 40;

export function EstadisticasScreen() {
  const { user } = useAuth();
  const [memoramaData, setMemoramaData] = useState([]);
  const [rompecabezasData, setRompecabezasData] = useState([]);
  const [respiraciones, setRespiraciones] = useState([]);
  const [yogaSesiones, setYogaSesiones] = useState([]);

  useEffect(() => {
    if (user?.id) {
      cargarDatos();
    }
  }, [user]);

  const cargarDatos = async () => {
    const memo = await obtenerPuntuacionesMemorama(user.id);
    const rompe = await obtenerPuntuacionesRompecabezas(user.id);
    const respi = await obtenerPuntuacionesRespiracion(user.id);
    const yoga = await obtenerSesionesYoga(user.id);
    setMemoramaData(memo);
    setRompecabezasData(rompe);
    setRespiraciones(respi);
    setYogaSesiones(yoga);
  };

  const calcularPromedioSemanal = () => {
    const ahora = new Date();
    const hace7Dias = new Date(ahora);
    hace7Dias.setDate(ahora.getDate() - 7);

    const sesionesRecientes = respiraciones.filter((s) => new Date(s.created_at) >= hace7Dias);
    if (sesionesRecientes.length === 0) return 0;

    const total = sesionesRecientes.reduce((sum, s) => sum + s.duracion, 0);
    return (total / sesionesRecientes.length).toFixed(2);
  };

  const calcularPromedioSemanalYoga = () => {
    const semanas = {};

    yogaSesiones.forEach((s) => {
      const fecha = new Date(s.created_at);
      const semana = `${fecha.getFullYear()}-W${Math.ceil((fecha.getDate() + 6 - fecha.getDay()) / 7)}`;
      if (!semanas[semana]) semanas[semana] = [];
      semanas[semana].push(s.duracion);
    });

    const labels = Object.keys(semanas);
    const promedio = labels.map((semana) => {
      const total = semanas[semana].reduce((a, b) => a + b, 0);
      return Math.floor(total / semanas[semana].length);
    });

    return { labels, promedio };
  };

  const renderGraficaYogaSemanal = () => {
    const { labels, promedio } = calcularPromedioSemanalYoga();

    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Promedio semanal - Yoga</Text>
        <LineChart
          data={{
            labels,
            datasets: [{ data: promedio, color: () => '#FFD700', strokeWidth: 2 }],
          }}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chartStyle}
        />
      </View>
    );
  };

  const crearGraficaYogaSesiones = (data) => {
    const labels = data.map((_, i) => `#${i + 1}`);
    const duraciones = data.map((s) => s.duracion);

    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Duración por sesión de Yoga</Text>
        <LineChart
          data={{
            labels,
            datasets: [{ data: duraciones, color: () => '#F2994A', strokeWidth: 2 }],
          }}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chartStyle}
        />
      </View>
    );
  };

  const crearGrafica = (data, label) => {
    const labels = data.map((_, i) => `#${i + 1}`);
    const puntos = data.map((p) => p.puntaje);
    const tiempos = data.map((p) => p.tiempo_restante);

    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Rendimiento en {label}</Text>
        <LineChart
          data={{
            labels,
            datasets: [
              {
                data: puntos,
                color: () => '#56CCF2',
                strokeWidth: 2,
              },
              {
                data: tiempos,
                color: () => '#BB6BD9',
                strokeWidth: 2,
              },
            ],
          }}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chartStyle}
        />
      </View>
    );
  };

  const crearGraficaRespiracion = (data) => {
    const labels = data.map((_, i) => `#${i + 1}`);
    const duraciones = data.map((r) => r.duracion);

    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Duración de sesiones de respiración</Text>
        <LineChart
          data={{
            labels,
            datasets: [{ data: duraciones, color: () => '#27AE60', strokeWidth: 2 }],
          }}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chartStyle}
        />
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>📊 Estadísticas de Juegos</Text>

      {memoramaData.length > 0 && crearGrafica(memoramaData, 'Memorama')}
      {rompecabezasData.length > 0 && crearGrafica(rompecabezasData, 'Rompecabezas')}
      {respiraciones.length > 0 && crearGraficaRespiracion(respiraciones)}
      {yogaSesiones.length > 0 && renderGraficaYogaSemanal()}
      {yogaSesiones.length > 0 && crearGraficaYogaSesiones(yogaSesiones)}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🧘 Sesiones de Respiración</Text>
        {respiraciones.length === 0 ? (
          <Text style={styles.noData}>No hay sesiones aún.</Text>
        ) : (
          respiraciones.map((sesion, idx) => (
            <View key={idx} style={styles.statItem}>
              <Text style={styles.statValue}>⏱ {sesion.duracion} segundos</Text>
              <Text style={styles.statDate}>
                📅 {new Date(sesion.created_at).toLocaleString()}
              </Text>
            </View>
          ))
        )}
      </View>

      <View style={styles.promedioCard}>
        <Text style={styles.sectionTitle}>📈 Promedio semanal de respiración</Text>
        <Text style={styles.promedioTexto}>{calcularPromedioSemanal()} segundos por sesión</Text>
      </View>

      <Text style={styles.footer}>
        🏅 Sigue jugando y respirando para desbloquear logros y mejorar tu bienestar
      </Text>
    </ScrollView>
  );
}

const chartConfig = {
  backgroundGradientFrom: '#141E30',
  backgroundGradientTo: '#243B55',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: () => '#ccc',
  propsForDots: {
    r: '4',
    strokeWidth: '2',
    stroke: '#fff',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0f172a',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  chartContainer: {
    marginBottom: 30,
    borderRadius: 12,
    padding: 10,
    backgroundColor: '#1e293b',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#56CCF2',
    marginBottom: 10,
    textAlign: 'center',
  },
  chartStyle: {
    borderRadius: 16,
  },
  section: {
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 12,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  statItem: {
    marginBottom: 12,
  },
  statValue: {
    fontSize: 16,
    color: '#56FF9F',
  },
  statDate: {
    fontSize: 13,
    color: '#aaa',
  },
  noData: {
    color: '#aaa',
    fontStyle: 'italic',
  },
  footer: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 30,
    textAlign: 'center',
  },
  promedioCard: {
    backgroundColor: '#1e3a8a',
    padding: 16,
    borderRadius: 12,
    marginBottom: 30,
  },
  promedioTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 8,
  },
});
