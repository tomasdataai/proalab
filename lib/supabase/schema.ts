// Este archivo define el esquema de la tabla de variables de entorno en Supabase
// Puedes ejecutar esta SQL en la consola de Supabase para crear la tabla

/*
CREATE TABLE IF NOT EXISTS env_variables (
  id SERIAL PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Políticas de seguridad para la tabla
ALTER TABLE env_variables ENABLE ROW LEVEL SECURITY;

-- Solo los administradores pueden ver todas las variables
CREATE POLICY "Admins can view all env variables" 
  ON env_variables FOR SELECT 
  USING (auth.role() = 'service_role');

-- Los usuarios autenticados solo pueden ver variables públicas
CREATE POLICY "Authenticated users can view public env variables" 
  ON env_variables FOR SELECT 
  USING (is_public = true AND auth.role() = 'authenticated');

-- Solo los administradores pueden modificar variables
CREATE POLICY "Only admins can insert env variables" 
  ON env_variables FOR INSERT 
  USING (auth.role() = 'service_role');

CREATE POLICY "Only admins can update env variables" 
  ON env_variables FOR UPDATE 
  USING (auth.role() = 'service_role');

CREATE POLICY "Only admins can delete env variables" 
  ON env_variables FOR DELETE 
  USING (auth.role() = 'service_role');
*/

export type EnvVariable = {
  id: number
  key: string
  value: string
  is_public: boolean
  created_at: string
  updated_at: string
}

