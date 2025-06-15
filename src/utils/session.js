import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Guarda la información del usuario en AsyncStorage.
 * 
 * @param {Object} user - Objeto con id, email y nombre del usuario.
 */
export const saveUserSession = async (user) => {
  try {
    await AsyncStorage.setItem("usuario", JSON.stringify(user));
    console.log("✅ Sesión guardada:", user);
  } catch (error) {
    console.error("❌ Error al guardar la sesión:", error);
    throw new Error("No se pudo guardar la sesión del usuario.");
  }
};

/**
 * Recupera la sesión del usuario desde AsyncStorage.
 * 
 * @returns {Object|null} Usuario guardado o null si no existe.
 */
export const getUserSession = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("usuario");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error("❌ Error al obtener la sesión:", error);
    return null;
  }
};

/**
 * Elimina la sesión del usuario (logout).
 */
export const clearUserSession = async () => {
  try {
    await AsyncStorage.removeItem("usuario");
    console.log("🚪 Sesión eliminada");
  } catch (error) {
    console.error("❌ Error al eliminar la sesión:", error);
  }
};
