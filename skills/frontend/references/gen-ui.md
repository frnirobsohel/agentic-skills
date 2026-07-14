# AI Integration in Frontend (GenUI)

When building AI-powered interfaces, standard text-streaming is not enough. You must build **Generative UI** where the LLM streams actual React components to the client.

## Vercel AI SDK Pattern
Using `streamUI` or `streamObject`, you can map LLM tool calls directly to React components.

```tsx
// Server Action (actions.tsx)
import { streamUI } from 'ai/rsc';
import { openai } from '@ai-sdk/openai';
import { WeatherCard } from './WeatherCard';

export async function askAI(question: string) {
  return await streamUI({
    model: openai('gpt-4o'),
    prompt: question,
    tools: {
      getWeather: {
        description: 'Get the weather for a location',
        parameters: z.object({ location: z.string() }),
        generate: async function* ({ location }) {
          yield <div>Loading weather for {location}...</div>;
          const weather = await fetchWeather(location);
          return <WeatherCard data={weather} />;
        },
      },
    },
  });
}
```

## UX Requirements for AI:
- **Streaming State**: Always provide immediate feedback. Use skeleton loaders or animated text to indicate processing.
- **Interruptibility**: Allow users to stop the stream at any time.
- **Graceful Fallbacks**: If the AI hallucinates bad JSON, the UI must catch the error via an Error Boundary and display a fallback instead of crashing the page.
- **Local AI (WebGPU)**: For privacy-first inference, use client-side models like Transformers.js, running natively in the browser without server calls.
