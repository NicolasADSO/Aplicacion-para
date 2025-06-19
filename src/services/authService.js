import {supabase} from '../supabase/supabase' 

export const getInfoUser = async()=>{
  const [data, error] = await supabase
    .from("usuarios")
    .select("nombre")
    .single();

  if(error){
    console.error(error)
    return null
  }

  return data.nombre
}

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