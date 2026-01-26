import  {streamText} from "ai";
import { openRouter } from "../lib/ai";


export default {
    async generateRecipe(prompt: string) {
        const result = streamText({
            model: openRouter('allenai/molmo-2-8b:free'),
            prompt: `Generate a detailed recipe based on the following input: ${prompt}`,
        });
        return result.textStream;
    }
};