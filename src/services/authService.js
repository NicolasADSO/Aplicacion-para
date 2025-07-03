import {supabase} from '../supabase/supabase' 

export const loginUser = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.toLowerCase(),
    password,
  });

  if (error || !data.user) {
    throw new Error("Correo o contraseña incorrectos.");
  }

  const { user } = data;

  // Buscar el perfil del usuario en la tabla personalizada `usuarios`
  const { data: perfil, error: perfilError } = await supabase
    .from("usuarios")
    .select("nombre")
    .eq("user_id", user.id)
    .single();

  if (perfilError) {
    console.warn("⚠️ No se encontró el nombre del usuario en la tabla `usuarios`");
  }

  return {
    id: user.id,
    email: user.email,
    nombre: perfil?.nombre || "Usuario",
  };
};


export const registerUser = async (userName, email, password) => {
  // Registro en Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email: email.toLowerCase(),
    password,
  });

  if (error) {
    throw new Error("Error al registrar usuario: " + error.message);
  }

  const user = data.user;

  if (!user || !user.id) {
    throw new Error("No se pudo obtener el ID del usuario.");
  }

  // Insertar en la tabla `usuarios` con datos personalizados
  const { error: insertError } = await supabase
    .from("usuarios")
    .insert([
      {
        user_id: user.id,
        nombre: userName,
        correo: email.toLowerCase(),
      },
    ]);

  if (insertError) {
    throw new Error("Error al guardar datos del usuario: " + insertError.message);
  }

  return true; // Registro exitoso
};
export const guardarPuntuacionEnSupabase = async (user_id, puntuacion) => {
  try {
    const { error } = await supabase
      .from("puntuaciones_memorama")
      .insert([{ ...puntuacion, user_id }]);

    if (error) {
      console.error("❌ Error al guardar puntuación en Supabase:", error.message);
    } else {
      console.log("✅ Puntuación guardada en Supabase.");
    }
  } catch (err) {
    console.error("❌ Error inesperado:", err);
  }
};
export const obtenerPuntuacionesMemorama = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('puntuaciones_memorama')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(3);

    if (error) {
      console.error('❌ Error al obtener puntuaciones de Supabase:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('❌ Error inesperado al obtener puntuaciones:', error);
    return [];
  }
};
export const guardarPuntuacionRompecabezas = async (user_id, puntuacion) => {
  try {
    const { error } = await supabase
      .from("puntuaciones_rompecabezas")
      .insert([{ ...puntuacion, user_id }]);

    if (error) {
      console.error("❌ Error al guardar puntuación del rompecabezas:", error.message);
    } else {
      console.log("✅ Puntuación de rompecabezas guardada en Supabase.");
    }
  } catch (err) {
    console.error("❌ Error inesperado al guardar rompecabezas:", err);
  }
};
export const obtenerPuntuacionesRompecabezas = async (user_id) => {
  try {
    const { data, error } = await supabase
      .from("puntuaciones_rompecabezas")
      .select("*")
      .eq("user_id", user_id)
      .order("created_at", { ascending: false })
      .limit(3);

    if (error) {
      console.error("❌ Error al obtener puntuaciones de rompecabezas:", error.message);
      return [];
    }

    return data;
  } catch (err) {
    console.error("❌ Error inesperado al obtener rompecabezas:", err);
    return [];
  }
};
export const guardarPuntuacionRespiracion = async (user_id, duracion) => {
  try {
    const { error } = await supabase
      .from('puntuaciones_respiracion')
      .insert([{ user_id, duracion }]);

    if (error) {
      console.error("❌ Error al guardar puntuación de respiración:", error.message);
    } else {
      console.log("✅ Sesión de respiración guardada.");
    }
  } catch (err) {
    console.error("❌ Error inesperado:", err);
  }
};

export const obtenerPuntuacionesRespiracion = async (user_id) => {
  try {
    const { data, error } = await supabase
      .from('puntuaciones_respiracion')
      .select('*')
      .eq('user_id', user_id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error("❌ Error al obtener puntuaciones de respiración:", error.message);
      return [];
    }

    return data;
  } catch (err) {
    console.error("❌ Error inesperado:", err);
    return [];
  }
};

// authService.js
export const guardarPuntuacionYoga = async (user_id, duracion) => {
  const { error } = await supabase.from('puntuaciones_yoga').insert([
    { user_id, duracion }
  ]);
  if (error) throw error;
};
export const obtenerSesionesYoga = async (user_id) => {
  const { data, error } = await supabase
    .from('puntuaciones_yoga')
    .select('*')
    .eq('user_id', user_id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error obteniendo sesiones de yoga:', error);
    return [];
  }

  return data;
};
export const obtenerSesionesYogaUltimaSemana = async (user_id) => {
  const desde = new Date();
  desde.setDate(desde.getDate() - 7);

  const { data, error } = await supabase
    .from('puntuaciones_yoga')
    .select('*')
    .eq('user_id', user_id)
    .gte('created_at', desde.toISOString());

  if (error) {
    console.error('Error al obtener sesiones de yoga de la última semana:', error);
    return [];
  }

  return data;
};


