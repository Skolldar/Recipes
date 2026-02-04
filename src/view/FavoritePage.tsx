import { useMemo } from "react"
import DrinkCard from "../components/DrinkCard"
import { useAppStore } from "../stores/useAppStore"

export default function FavoritePage() {
 const favorites = useAppStore ((state) => state.favorites)

 const hasFavorites = useMemo(() => favorites.length, [favorites])

  return (
    <>
    <div>
      <h1 className="font-bold lg:text-6xl text-3xl">Favorites</h1>
     
        {hasFavorites ? ( 
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 lg:my-10 lg:gap-10 my-5 gap-5">
            {favorites.map(drink => (
              <DrinkCard
              key={drink.idDrink}
              drink={drink}
              />
            ))}
          </div>
        ) : (
          <p className="lg:my-10 my-5 text-center lg:text-2xl text-xl">There's no favorites recipes yet.</p>
        )}
        

    </div>
    </>
  )
}
