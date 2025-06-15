import { createClient } from "@supabase/supabase-js";

const supabase_url = 'https://fkzaihpkxlvllwrltorh.supabase.co'
const supabase_anon_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZremFpaHBreGx2bGx3cmx0b3JoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzMTkyOTcsImV4cCI6MjA2Mzg5NTI5N30.yws_Neoq2iawC2tCJIYePKe2mwZk2AqxRbNN7Kb3ZI8';

export const supabase = createClient(supabase_url, supabase_anon_key);