import { StyleSheet } from 'react-native';
import colors from './colors'; // Importa la paleta de colores

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary, 
    padding: 20,
  },
  logo: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.secondary, 
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
});

export default styles;
