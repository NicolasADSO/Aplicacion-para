// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../supabase/supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loginUser = async (userData) => {
    try {
      setUser(userData);
      await AsyncStorage.setItem('usuario', JSON.stringify(userData));
      console.log("✅ Usuario guardado en AsyncStorage y contexto.");
    } catch (error) {
      console.error("❌ Error guardando usuario en AsyncStorage:", error);
    }
  };

  const logoutUser = async () => {
    try {
      setUser(null);
      await AsyncStorage.removeItem('usuario');
      await supabase.auth.signOut();
      console.log("👋 Usuario deslogueado y limpiado de AsyncStorage.");
    } catch (error) {
      console.error("❌ Error al cerrar sesión:", error);
    }
  };

  // ✅ Restaurar sesión automáticamente
  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const session = sessionData?.session;

        if (session?.user) {
          const userId = session.user.id;

          // Buscar el nombre en la tabla personalizada `usuarios`
          const { data: perfil, error } = await supabase
            .from("usuarios")
            .select("nombre")
            .eq("user_id", userId)
            .single();

          const usuarioFinal = {
            id: userId,
            email: session.user.email,
            nombre: perfil?.nombre || 'Usuario',
          };

          setUser(usuarioFinal);
          await AsyncStorage.setItem('usuario', JSON.stringify(usuarioFinal));
          console.log("🔄 Sesión restaurada desde Supabase:", usuarioFinal);
        } else {
          // Fallback: recuperar del almacenamiento local
          const localData = await AsyncStorage.getItem('usuario');
          if (localData) {
            const parsed = JSON.parse(localData);
            setUser(parsed);
            console.log("🗂️ Usuario restaurado desde AsyncStorage:", parsed);
          }
        }
      } catch (error) {
        console.error("❌ Error restaurando sesión:", error);
      }
    };

    cargarUsuario();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
