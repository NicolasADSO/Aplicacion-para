import { supabase } from '../supabase/supabase';

export const getLastBPMByUser = async (userId) => {
  console.log('🧠 Consultando BPM para user_id:', userId);

  const { data, error } = await supabase
    .from('heart_readings')
    .select('bpm, measured_at')
    .eq('user_id', userId)
    .order('measured_at', { ascending: false })
    .limit(1);

  if (error) {
    console.error('❌ Error al consultar Supabase:', error.message);
    return null;
  }

  console.log('✅ Resultado recibido de Supabase:', data);
  return data[0] || null;
};
