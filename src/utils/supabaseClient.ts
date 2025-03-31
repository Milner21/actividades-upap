import { createClient } from '@supabase/supabase-js';

// Definimos las credenciales de Supabase (reemplázalas con tus datos)
const SUPABASE_URL = 'https://nguralyrhsnnjhbsbued.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ndXJhbHlyaHNubmpoYnNidWVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMyOTg4NDMsImV4cCI6MjA1ODg3NDg0M30.xHeFZsAQbrSXp1TfAs0hzUgAr7M8hSgrTTVp0dNRziE';

// Creamos el cliente de Supabase usando las credenciales
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
