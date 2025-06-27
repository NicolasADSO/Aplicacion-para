// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../supabase/supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false); // ✅ Indicador de carga

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

  useEffect(() => {
  const cargarUsuario = async () => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData?.session;

      const avatarLocal = await AsyncStorage.getItem('avatar_uri'); // 👈 Nuevo

      if (session?.user) {
        const userId = session.user.id;

        const { data: perfil, error } = await supabase
          .from("usuarios")
          .select("nombre")
          .eq("user_id", userId)
          .single();  

        const usuarioFinal = {
          id: userId,
          email: session.user.email,
          nombre: perfil?.nombre || 'Usuario',
          avatar_uri: avatarLocal || null, // 👈 Preferimos lo local
        };

        setUser(usuarioFinal);
        await AsyncStorage.setItem('usuario', JSON.stringify(usuarioFinal));
        console.log("🔄 Sesión restaurada desde Supabase + avatar local:", usuarioFinal);
      } else {
        const localData = await AsyncStorage.getItem('usuario');
        if (localData) {
          const parsed = JSON.parse(localData);
          const avatarLocal = await AsyncStorage.getItem('avatar_uri'); // 👈 nuevo
          setUser({
            ...parsed,
            avatar_uri: avatarLocal || null,
          });
          console.log("🗂️ Usuario restaurado desde AsyncStorage:", {
            ...parsed,
            avatar_uri: avatarLocal || null,
          });
        }
      }
    } catch (error) {
      console.error("❌ Error restaurando sesión:", error);
    } finally {
      setIsAuthLoaded(true);
    }
  };

  cargarUsuario();
}, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loginUser, logoutUser, isAuthLoaded }}>
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
