import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveRole = async (role)=>{
    try {
        await AsyncStorage.setItem('role', role);
    } catch (error) {
        console.error("Error al guardar el rol:", error);
    }
}

export const getRole = () => {
    try {
        return AsyncStorage.getItem('role');
    } catch (error) {
        console.error("Error al obtener el rol:", error);
    }
}

export const clearSession = async () => {
    try {
        return AsyncStorage.removeItem('role');
    } catch (error) {
        confirm.error("Error al limpiar la sesión:", error);
    }
}