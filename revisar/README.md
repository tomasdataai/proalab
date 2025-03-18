# Next.js 15 con App Router y SSR de Supabase

Este documento contiene información sobre cómo funciona Next.js 15 con App Router y la implementación actual del SSR de Supabase.

## Next.js 15 con App Router

### Características principales de Next.js 15

- **Soporte para React 19**: Next.js 15 es compatible con React 19 estable para el Pages Router y continúa proporcionando versiones Canary de React para el App Router.

- **Cambios en la semántica de caché**: 
  - Los Route Handlers GET ya no se almacenan en caché por defecto.
  - El Client Router Cache ya no almacena en caché los componentes de Page por defecto (staleTime de 0 para segmentos de Page).
  - Se pueden configurar estos comportamientos mediante opciones en next.config.js.

- **APIs de solicitud asíncronas (Cambio importante)**:
  - Las APIs que dependen de datos específicos de la solicitud (headers, cookies, params, searchParams) ahora son asíncronas.
  - Esto permite optimizaciones futuras y preparación del servidor antes de que llegue una solicitud.
  - Ejemplo: `const cookieStore = await cookies();`

- **Turbopack estable para desarrollo**: Mejora significativa en tiempos de compilación.

- **Actualizaciones más sencillas**: Nueva herramienta CLI `@next/codemod` para facilitar las actualizaciones entre versiones.

- **Componente `<Form>`**: Facilita el trabajo con formularios en Server Actions.

- **Soporte para next.config.ts**: Ahora se puede configurar Next.js usando TypeScript.

### App Router y Server Components

El App Router de Next.js introduce un nuevo modelo para construir aplicaciones utilizando las últimas características de React:

- **Server Components como predeterminado**: Los componentes dentro del directorio `app/` son Server Components por defecto.

- **Data Fetching en el servidor**: 
  - Se utiliza la API `fetch` nativa para obtener datos en Server Components.
  - Por defecto, las respuestas de `fetch` no se almacenan en caché.
  - Ejemplo básico:
    ```jsx
    export default async function Page() {
      const data = await fetch('https://api.example.com/data')
      const posts = await data.json()
      return (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )
    }
    ```

- **Renderizado dinámico vs estático**:
  - Si no se utilizan APIs dinámicas, las rutas se prerenderizarán durante la compilación.
  - Para forzar el renderizado dinámico: `export const dynamic = 'force-dynamic'`
  - El uso de `cookies()`, `headers()` o `searchParams` hace que una página se renderice dinámicamente automáticamente.

- **Streaming con Suspense**: Permite mostrar partes de la página mientras otras están cargando.

- **Server Actions**: Permite ejecutar funciones en el servidor desde el cliente.

## SSR de Supabase (Implementación actual)

La implementación actual del SSR de Supabase con Next.js ha evolucionado significativamente, abandonando los antiguos helpers por un enfoque más integrado con el App Router.

### Configuración básica

1. **Instalación de paquetes**:
   ```bash
   npm install @supabase/supabase-js @supabase/ssr
   ```

2. **Variables de entorno**:
   ```
   NEXT_PUBLIC_SUPABASE_URL=<your_supabase_project_url>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_supabase_anon_key>
   ```

3. **Clientes de Supabase**:
   Se necesitan dos tipos de clientes:
   - **Cliente para Client Components**: Para acceder a Supabase desde componentes que se ejecutan en el navegador.
   - **Cliente para Server Components**: Para acceder a Supabase desde Server Components, Server Actions y Route Handlers.

### Middleware para autenticación

El middleware es crucial para la autenticación del lado del servidor, ya que los Server Components no pueden escribir cookies. El middleware se encarga de:

1. Refrescar el token de autenticación (llamando a `supabase.auth.getUser()`).
2. Pasar el token actualizado a los Server Components.
3. Pasar el token actualizado al navegador.

Ejemplo de middleware:

```javascript
import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

### Consideraciones importantes para la autenticación

- **Siempre usar `supabase.auth.getUser()`**: Para proteger páginas y datos de usuario, ya que envía una solicitud al servidor de Auth de Supabase cada vez para revalidar el token.

- **Nunca confiar en `supabase.auth.getSession()`**: Dentro del código del servidor como middleware, no garantiza la revalidación del token de Auth.

- **Llamar a `cookies()` antes de Supabase**: Para las solicitudes autenticadas, esto opta por no usar el caché de Next.js, asegurando que los usuarios solo accedan a sus propios datos.

### Acceso a la información del usuario desde Server Components

Ejemplo de una página privada que muestra el correo electrónico del usuario:

```javascript
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export default async function PrivatePage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return <p>Hello {data.user.email}</p>
}
```

## Integración con shadcn/ui y Tailwind CSS v4

La integración de Next.js 15 con shadcn/ui y Tailwind CSS v4 ofrece una experiencia de desarrollo moderna y eficiente para crear interfaces de usuario atractivas y funcionales.

### Configuración de shadcn/ui en Next.js 15

1. **Instalación de shadcn/ui**:
   ```bash
   npx shadcn-ui@latest init
   ```

2. **Instalación de componentes**:
   ```bash
   npx shadcn@latest add
   ```
   Esto permite seleccionar los componentes específicos que se desean utilizar en el proyecto.

3. **Compatibilidad con React 19**:
   shadcn/ui es compatible con React 19, aunque puede requerir el uso de `--legacy-peer-deps` durante la instalación debido a problemas de dependencias entre pares en npm.

### Tailwind CSS v4 con Next.js 15

Tailwind CSS v4 introduce un nuevo enfoque de tematización en línea que elimina la necesidad de archivos de configuración extensos:

- Ya no se requiere un archivo `tailwind.config.ts` para muchas configuraciones básicas.
- Se pueden definir temas directamente en el archivo CSS global.

### Modo oscuro con next-themes

La implementación del modo oscuro se realiza fácilmente mediante el paquete `next-themes`, que se integra perfectamente con shadcn/ui:

```bash
npm install next-themes
```

## Características avanzadas de Supabase con Next.js 15

### Supabase Edge Runtime

Supabase Edge Runtime es un servidor web basado en el runtime de Deno, capaz de ejecutar servicios JavaScript, TypeScript y WASM. Esto permite:

- Probar localmente y autoalojar las Edge Functions de Supabase
- Funcionar como un proxy HTTP programable para interceptar/enrutar solicitudes HTTP

### Implementación actualizada del cliente de Supabase

En Next.js 15, la implementación del cliente de servidor de Supabase debe tener en cuenta que la API de cookies es asíncrona:

```typescript
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        },
      },
    }
  );
}
```

### Plantillas de inicio rápido

Existen plantillas de inicio rápido que integran Next.js 15, Supabase y shadcn/ui con características como:

- Autenticación preconfigurada con proveedores OAuth
- Modo oscuro integrado usando los temas de shadcn/ui
- Páginas de inicio atractivas con secciones hero y características
- TypeScript para codificación segura de tipos
- Enrutamiento dinámico con transiciones fluidas entre páginas
- Rutas API para lógica de backend personalizada

## Operaciones CRUD con Next.js 15 y Supabase

La implementación de operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en Next.js 15 con Supabase se beneficia de las últimas características:

- **Server Actions**: Permiten implementar operaciones de mutación de datos directamente desde componentes del servidor.
- **Promise-based searchParams**: Next.js 15 mejora el manejo de parámetros de búsqueda con soporte basado en promesas.
- **Integración con React 19**: Aprovecha las mejoras de rendimiento y las nuevas características de React 19.

### Ejemplo de implementación CRUD

Un flujo típico para implementar operaciones CRUD incluye:

1. Configurar los clientes de Supabase (cliente y servidor)
2. Implementar middleware para la actualización de sesiones
3. Crear páginas de login/signup con Server Actions
4. Implementar operaciones CRUD utilizando Server Actions
5. Configurar rutas privadas y confirmación de autenticación

Esta arquitectura moderna aprovecha al máximo las capacidades de Next.js 15 y Supabase para crear aplicaciones web robustas y eficientes.

## Conclusiones

1. **Next.js 15 mejora el rendimiento y la experiencia del desarrollador** con características como Turbopack estable y soporte para React 19.

2. **Los cambios en la caché y las APIs asíncronas** requieren adaptaciones en el código existente, pero proporcionan una base más sólida para optimizaciones futuras.

3. **La implementación actual de SSR de Supabase** está completamente integrada con el App Router de Next.js, utilizando los paquetes `@supabase/ssr` y `@supabase/supabase-js`.

4. **La autenticación del lado del servidor** se maneja a través del middleware, que refresca los tokens de autenticación y los pasa a los componentes del servidor y al navegador.

5. **Es crucial entender la diferencia entre `getUser()` y `getSession()`** para implementar correctamente la autenticación del lado del servidor.

6. **El uso de `cookies()` antes de las llamadas a Supabase** es importante para evitar problemas de caché en solicitudes autenticadas.
