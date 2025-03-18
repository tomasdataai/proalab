# ProaLAB.cloud

## Plataforma de Modelado de Futuros Educacionales

ProaLAB.cloud es la plataforma más avanzada de Hispanoamérica para el modelado de futuros educacionales, cerrando la brecha entre educación e industria mediante Inteligencia Artificial, Procesamiento de Lenguaje Natural, Deep Learning, métodos econométricos y forecasting predictivo.

## Tecnologías

- **Next.js 15**: Framework React con App Router para una experiencia de desarrollo moderna
- **Supabase**: Base de datos PostgreSQL con autenticación y almacenamiento
- **Perplexity AI**: Integración avanzada para procesamiento de lenguaje natural
- **Tailwind CSS v4**: Utilidades CSS para un diseño rápido y responsivo
- **shadcn/ui**: Componentes de UI accesibles y personalizables
- **TypeScript**: Tipado estático para un desarrollo más seguro

## Entornos

- **Desarrollo**: http://localhost:3000
- **Producción**: https://proalab.cloud

## Estructura del Proyecto

```
├── app/                # Rutas y páginas de Next.js
│   ├── actions/        # Server Actions
│   ├── api/            # API Routes
│   ├── auth/           # Autenticación
│   ├── blog/           # Blog
│   ├── dashboard/      # Dashboard
├── components/         # Componentes reutilizables
├── contexts/           # Contextos de React
├── hooks/              # Custom hooks
├── lib/                # Utilidades y servicios
│   ├── perplexity.ts   # Cliente de Perplexity AI
│   ├── supabase.ts     # Cliente de Supabase
├── public/             # Archivos estáticos
├── styles/             # Estilos globales
```

## Configuración

El proyecto utiliza variables de entorno para configurar las conexiones a servicios externos:

- Supabase: URL y claves de API
- Perplexity: Clave de API

Estas variables se configuran en el archivo `.env.local` (no incluido en el repositorio por seguridad).

## Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

## Despliegue

El proyecto está configurado para desplegarse en Vercel, conectado al dominio proalab.cloud.

```bash
# Construir para producción
npm run build

# Iniciar en modo producción
npm start
```

## Características

- **Autenticación**: Sistema completo con login, registro y recuperación de contraseña
- **Dashboard**: Panel de control para usuarios registrados
- **Blog**: Sistema de blog con contenido dinámico
- **API**: Endpoints para integración con servicios externos
- **Perplexity AI**: Integración para análisis avanzado de datos educativos

## Licencia

Propiedad de PROA Consulting. Todos los derechos reservados.
