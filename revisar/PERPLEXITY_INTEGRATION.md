# Integración de Perplexity AI con Next.js 15 y Vercel

Este documento proporciona una guía completa sobre cómo integrar Perplexity AI con aplicaciones Next.js 15 desplegadas en Vercel, incluyendo información sobre los modelos disponibles, configuración, implementación y mejores prácticas.

## Índice

1. [Introducción a Perplexity AI](#introducción-a-perplexity-ai)
2. [Modelos Disponibles y Capacidades](#modelos-disponibles-y-capacidades)
3. [Configuración Inicial](#configuración-inicial)
4. [Integración con Next.js 15](#integración-con-nextjs-15)
5. [Implementación de un Wrapper de Perplexity](#implementación-de-un-wrapper-de-perplexity)
6. [Ejemplos de Uso](#ejemplos-de-uso)
7. [Mejores Prácticas](#mejores-prácticas)
8. [Consideraciones de Rendimiento y Costos](#consideraciones-de-rendimiento-y-costos)
9. [Recursos Adicionales](#recursos-adicionales)

## Introducción a Perplexity AI

Perplexity AI es una plataforma que ofrece acceso a modelos de lenguaje avanzados a través de su API Sonar. Lo que distingue a Perplexity es su capacidad para combinar búsquedas web en tiempo real con procesamiento de lenguaje natural, proporcionando respuestas fundamentadas en datos actuales de la web e incluyendo citas detalladas.

Esta característica hace que Perplexity sea ideal para:

- Investigación y documentación
- Verificación de hechos
- Obtención de información actualizada
- Generación de contenido basado en datos recientes
- Asistentes virtuales con conocimientos actualizados

## Modelos Disponibles y Capacidades

Perplexity ofrece varios modelos con diferentes capacidades y casos de uso:

### `sonar-deep-research`

**Descripción**: Realiza investigaciones exhaustivas a nivel de experto y las sintetiza en informes accesibles y procesables.

**Características**:
- Investigación exhaustiva: Realiza docenas de búsquedas, leyendo cientos de fuentes.
- Análisis a nivel de experto: Razona de forma autónoma y genera ideas detalladas en una amplia gama de temas.
- Generación de informes: Sintetiza toda la investigación en un informe claro y completo.
- Privacidad de datos: No entrena con datos de clientes.

### `sonar-reasoning-pro`

**Descripción**: Oferta de razonamiento premium impulsada por DeepSeek R1 con Chain of Thought (CoT).

**Caso de uso típico**: Generar análisis complejos como tesis de inversión, estrategias de negocio, etc.

### `sonar-pro`

**Descripción**: Oferta de búsqueda premium con fundamentación en búsquedas, compatible con consultas avanzadas y seguimientos.

**Caso de uso típico**: Responder preguntas específicas sobre empresas, tecnologías o tendencias actuales.

### `sonar`

**Descripción**: Oferta ligera con fundamentación en búsquedas, más rápida y económica que Sonar Pro.

**Caso de uso típico**: Responder preguntas sencillas y directas que requieren datos actualizados.

### `r1-1776`

**Descripción**: Una versión del modelo DeepSeek R1 que ha sido post-entrenada para proporcionar información sin censura, imparcial y factual.

## Configuración Inicial

### Requisitos Previos

1. Una cuenta en [Perplexity AI](https://docs.perplexity.ai)
2. Una clave API de Perplexity (disponible en el portal de desarrolladores)
3. Un proyecto Next.js 15 configurado
4. Una cuenta de Vercel para el despliegue

### Configuración de Variables de Entorno

Crea o actualiza tu archivo `.env.local` con las siguientes variables:

```
PERPLEXITY_API_KEY=tu_clave_api_aquí
NEXT_PUBLIC_PERPLEXITY_API_KEY=tu_clave_api_aquí  # Solo si necesitas acceso desde el cliente
```

## Integración con Next.js 15

### Instalación de Dependencias

```bash
pnpm add @ai-sdk/perplexity openai ai
```

### Configuración del Proveedor en Vercel

1. Navega a la pestaña AI en tu [dashboard de Vercel](https://vercel.com/dashboard)
2. Selecciona Perplexity API de la lista de proveedores y presiona Add
3. Revisa la información del proveedor y presiona Add Provider
4. Selecciona a qué proyectos tendrá acceso el proveedor (todos o específicos)
5. Completa el proceso de conexión siguiendo las instrucciones
6. Actualiza las variables de entorno en tu proyecto usando Vercel CLI:

```bash
vercel env pull
```

### Creación de un Endpoint de API en Next.js 15

Crea un archivo `app/api/chat/route.ts` con el siguiente contenido:

```typescript
// app/api/chat/route.ts
import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Permitir respuestas en streaming de hasta 30 segundos
export const maxDuration = 30;

const perplexity = createOpenAI({
  name: 'perplexity',
  apiKey: process.env.PERPLEXITY_API_KEY ?? '',
  baseURL: 'https://api.perplexity.ai/',
});

export async function POST(req: Request) {
  // Extraer los `messages` del cuerpo de la solicitud
  const { messages } = await req.json();

  // Llamar al modelo de lenguaje
  const result = streamText({
    model: perplexity('sonar-pro'),  // Puedes cambiar el modelo según tus necesidades
    messages,
  });

  // Responder con el stream
  return result.toDataStreamResponse();
}
```

### Creación de un Componente de Chat en el Cliente

Crea un archivo `app/chat/page.tsx` con el siguiente contenido:

```typescript
// app/chat/page.tsx
'use client';

import { useChat } from '@ai-sdk/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto p-4">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((m) => (
          <div key={m.id} className={`p-3 rounded-lg ${m.role === 'user' ? 'bg-blue-100 ml-auto' : 'bg-gray-100'}`}>
            <p className="font-semibold">{m.role === 'user' ? 'Tú:' : 'AI:'}</p>
            <p>{m.content}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Escribe tu pregunta..."
          className="flex-1 p-2 border rounded"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Enviar
        </button>
      </form>
    </div>
  );
}
```

## Implementación de un Wrapper de Perplexity

Para facilitar el uso de Perplexity en toda tu aplicación, puedes crear un wrapper personalizado:

### Creación del Wrapper

Crea un archivo `utils/perplexity.ts` con el siguiente contenido:

```typescript
// utils/perplexity.ts
import { createOpenAI } from '@ai-sdk/openai';
import { generateText, streamText } from 'ai';

// Tipos para las opciones de configuración
export type PerplexityOptions = {
  model?: 'sonar-deep-research' | 'sonar-reasoning-pro' | 'sonar-pro' | 'sonar' | 'r1-1776';
  returnImages?: boolean;
  temperature?: number;
  maxTokens?: number;
};

// Tipo para las fuentes de información
export type PerplexitySource = {
  title: string;
  url: string;
  snippet: string;
};

// Clase wrapper para Perplexity
export class PerplexityWrapper {
  private client;
  private defaultModel: string;

  constructor(apiKey?: string, defaultModel: string = 'sonar-pro') {
    this.client = createOpenAI({
      name: 'perplexity',
      apiKey: apiKey || process.env.PERPLEXITY_API_KEY || '',
      baseURL: 'https://api.perplexity.ai/',
    });
    this.defaultModel = defaultModel;
  }

  // Método para generar texto sin streaming
  async generate(prompt: string, options: PerplexityOptions = {}) {
    const { model = this.defaultModel, returnImages = false, temperature = 0.7, maxTokens } = options;
    
    const result = await generateText({
      model: this.client(model),
      prompt,
      temperature,
      maxTokens,
      providerOptions: {
        perplexity: {
          return_images: returnImages,
        },
      },
    });

    return {
      text: result.text,
      sources: result.sources as PerplexitySource[],
      metadata: result.providerMetadata?.perplexity,
    };
  }

  // Método para generar texto con streaming
  async streamGenerate(prompt: string, options: PerplexityOptions = {}) {
    const { model = this.defaultModel, returnImages = false, temperature = 0.7, maxTokens } = options;
    
    const result = streamText({
      model: this.client(model),
      prompt,
      temperature,
      maxTokens,
      providerOptions: {
        perplexity: {
          return_images: returnImages,
        },
      },
    });

    return result;
  }

  // Método para chat sin streaming
  async chat(messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>, options: PerplexityOptions = {}) {
    const { model = this.defaultModel, returnImages = false, temperature = 0.7, maxTokens } = options;
    
    const result = await generateText({
      model: this.client(model),
      messages,
      temperature,
      maxTokens,
      providerOptions: {
        perplexity: {
          return_images: returnImages,
        },
      },
    });

    return {
      text: result.text,
      sources: result.sources as PerplexitySource[],
      metadata: result.providerMetadata?.perplexity,
    };
  }

  // Método para chat con streaming
  async streamChat(messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>, options: PerplexityOptions = {}) {
    const { model = this.defaultModel, returnImages = false, temperature = 0.7, maxTokens } = options;
    
    const result = streamText({
      model: this.client(model),
      messages,
      temperature,
      maxTokens,
      providerOptions: {
        perplexity: {
          return_images: returnImages,
        },
      },
    });

    return result;
  }
}

// Exportar una instancia por defecto para uso sencillo
export const perplexity = new PerplexityWrapper();
```

### Uso del Wrapper en un API Route

Modifica tu archivo `app/api/chat/route.ts` para usar el wrapper:

```typescript
// app/api/chat/route.ts
import { perplexity } from '@/utils/perplexity';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, options = {} } = await req.json();

  const stream = await perplexity.streamChat(messages, options);
  return stream.toDataStreamResponse();
}
```

## Ejemplos de Uso

### Ejemplo 1: Investigación Avanzada

Crea un endpoint específico para investigación profunda:

```typescript
// app/api/research/route.ts
import { perplexity } from '@/utils/perplexity';

export const maxDuration = 60; // Investigaciones profundas pueden tomar más tiempo

export async function POST(req: Request) {
  const { query } = await req.json();

  const result = await perplexity.generate(query, {
    model: 'sonar-deep-research',
    temperature: 0.2, // Menor temperatura para respuestas más precisas
  });

  return Response.json({
    result: result.text,
    sources: result.sources,
    metadata: result.metadata,
  });
}
```

### Ejemplo 2: Componente de Búsqueda con Fuentes

```tsx
// components/PerplexitySearch.tsx
'use client';

import { useState } from 'react';
import type { PerplexitySource } from '@/utils/perplexity';

export default function PerplexitySearch() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  const [sources, setSources] = useState<PerplexitySource[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      setResult(data.result);
      setSources(data.sources || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="¿Qué quieres investigar?"
            className="flex-1 p-3 border rounded-lg"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg disabled:bg-blue-400"
          >
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </div>
      </form>

      {result && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Resultados</h2>
          <div className="prose max-w-none">
            {result.split('\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      )}

      {sources.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Fuentes</h2>
          <div className="space-y-4">
            {sources.map((source, i) => (
              <div key={i} className="p-4 border rounded-lg">
                <h3 className="font-semibold">
                  <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {source.title}
                  </a>
                </h3>
                <p className="text-sm text-gray-600 mt-1">{source.snippet}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

## Mejores Prácticas

### 1. Gestión de Claves API

- Nunca expongas tu clave API de Perplexity en el código del cliente
- Utiliza variables de entorno para almacenar claves API
- Considera usar la integración de Vercel para gestionar las claves API de forma segura

### 2. Optimización de Rendimiento

- Utiliza streaming para respuestas largas para mejorar la experiencia del usuario
- Implementa caché para consultas comunes o que no requieren datos en tiempo real
- Considera el uso de ISR (Incremental Static Regeneration) para contenido semi-estático

### 3. Selección de Modelos

- Usa `sonar` para consultas simples y rápidas
- Usa `sonar-pro` para consultas más complejas que requieren datos actualizados
- Usa `sonar-deep-research` para investigaciones exhaustivas
- Usa `sonar-reasoning-pro` para análisis complejos y razonamiento

### 4. Manejo de Errores

```typescript
try {
  const result = await perplexity.generate(prompt, options);
  // Procesar resultado
} catch (error) {
  if (error instanceof Error) {
    console.error('Error al generar texto:', error.message);
    // Manejar el error específico
  }
  // Proporcionar una respuesta de fallback o notificar al usuario
}
```

### 5. Mostrar Fuentes

Siempre muestra las fuentes cuando uses modelos con capacidad de búsqueda web para aumentar la credibilidad y permitir a los usuarios verificar la información.

## Consideraciones de Rendimiento y Costos

### Rendimiento

- Los modelos con búsqueda web (`sonar`, `sonar-pro`, `sonar-deep-research`) pueden tardar más en responder debido a las búsquedas en tiempo real
- Implementa indicadores de carga y streaming para mejorar la experiencia del usuario
- Considera el uso de Edge Functions en Vercel para reducir la latencia

### Costos

- Los precios varían según el modelo y el nivel de uso
- `sonar` es más económico que `sonar-pro` y `sonar-deep-research`
- Implementa límites de uso y monitoreo para controlar los costos
- Consulta la [documentación de precios de Perplexity](https://docs.perplexity.ai) para obtener información actualizada

## Recursos Adicionales

- [Documentación oficial de Perplexity API](https://docs.perplexity.ai)
- [Vercel AI SDK](https://sdk.vercel.ai)
- [Integración de Perplexity con Vercel](https://vercel.com/docs/ai/perplexity)
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [Ejemplos de código en GitHub](https://github.com/vercel/ai/tree/main/examples)
