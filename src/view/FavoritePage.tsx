import { useMemo } from "react"
import DrinkCard from "../components/DrinkCard"
import { useAppStore } from "../stores/useAppStore"

export default function FavoritePage() {
 const favorites = useAppStore ((state) => state.favorites)

 const hasFavorites = useMemo(() => favorites.length, [favorites])

  return (
    <>
    <div>
      <h1 className="font-bold text-6xl">Favorites</h1>
     
        {hasFavorites ? ( 
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10">
            {favorites.map(drink => (
              <DrinkCard
              key={drink.idDrink}
              drink={drink}
              />
            ))}
          </div>
        ) : (
          <p className="my-10 text-center text-2xl">There's no favorites recipes yet.</p>
        )}
        

    </div>
    </>
  )
}
