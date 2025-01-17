import { Drink } from "../types"
import { useAppStore } from "../stores/useAppStore"

type DrinkCardProps = {
    drink: Drink
}
const DrinkCard = ({drink} : DrinkCardProps) => {
    const selectedRecipe = useAppStore((state) => state.selectRecipe)

  return (
    <>
    <div className="border shadow-lg">
        <div className="overflow-hidden">
            <img src={drink.strDrinkThumb} alt={`image of ${drink.strDrink}`} className="hover:scale-125 transition-transform hover:rotate-2"/>
        </div>

        <div className="p-5 ">
            <h2 className="text-2xl font-black truncate">{drink.strDrink}</h2>
            <button
                type="button"
                className="bg-orange-600 hover:bg-orange-500 mt-5 w-full p-3 font-bold text-white text-lg"
                onClick={() => selectedRecipe(drink.idDrink)}>
                    Check Recipe
            </button>
        </div>
    </div>
    </>
  )
}

export default DrinkCard
