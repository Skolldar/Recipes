import { createOpenRouter } from "@openrouter/ai-sdk-provider"

export const openRouter = createOpenRouter({
    apiKey: import.meta.env.VITE_OPENAROUTER_API_KEY,
})
