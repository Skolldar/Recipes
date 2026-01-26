import  {streamText} from "ai";
import { openRouter } from "../lib/ai";


export default {
    async generateRecipe(prompt: string) {
        const result = streamText({
            model: openRouter('meta-llama/llama-3.3-70b-instruct:free'),
            prompt: `Generate a detailed recipe based on the following input: ${prompt}`,
            system: "You are a bartender that teaches people how to make drinks based on ingredients they have.",
        });
        return result.textStream;
    }
};