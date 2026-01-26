import { useAppStore } from "../stores/useAppStore";


export default function GenerateAI() {

    const showNotification = useAppStore((state) => state.showNotification);
    const generateRecipe = useAppStore((state) => state.generateRecipe);
    const recipe = useAppStore((state) => state.recipe);
    const isGenerating = useAppStore((state) => state.isGenerating);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = new FormData(e.currentTarget);
      const prompt = form.get('prompt')?.toString().trim();
      if (!prompt) {
        showNotification({
          text: 'Please enter a prompt',
          error: true
        });
        return;
      }
      await generateRecipe(prompt);
    }
  
  return (
    <>
      <h1 className="max-w-4xl text-6xl font-extrabold">Generate AI Recipe</h1>

      <div className="">
        <form  
          onSubmit={handleSubmit}
          className='flex flex-col space-y-3 py-10'
        >
          <div className="relative">
            <input 
              name="prompt" 
              id="prompt" 
              className="border bg-white p-4 rounded-lg w-full border-slate-800" 
              placeholder="Generate a recipe with ingredients. E.g. Drink with Tequila and Strawberry"
            />
            <button
              type="submit" 
              aria-label="Send prompt"
              className={`cursor-pointer absolute top-1/2 right-5 transform -translate-x-1/2 -translate-y-1/2 ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isGenerating}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </button>
          </div>
        </form>
        {isGenerating && (
          <div className="flex items-center space-x-2">
            <span className="w-6 h-6 border-4 border-orange-500 border-t-transparent rounded-full animate-spin inline-block"></span>
            <span>Generating recipe...</span>
          </div>
        )}
        <div className="py-10 whitespace-pre-wrap">
          {recipe || "Recipe will be shown here..."}
        </div>
      </div>

    </> 
      )
}