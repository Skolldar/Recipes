import { useMemo } from "react"
import { useAppStore } from "../stores/useAppStore"
import DrinkCard from "../components/DrinkCard"

function HomePage() {
  const drinks = useAppStore((state) =>state.drinks)

  const hasDrinks = useMemo(()  => drinks.drinks.length, [drinks])
  return (
    <>
      <div className="">
        <h1 className="lg:text-6xl text-3xl font-extrabold">Recipe</h1>
        {hasDrinks ? (
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 lg:my-10 lg:gap-10 my-5 gap-5">
          {drinks.drinks.map((drink) => (
            <DrinkCard
              key={drink.idDrink}
              drink={drink}
            />
          ))}
          </div>
        ): (
          <p className="lg:my-10 my-5 text-center lg:text-2xl text-xl ">There's no recipes yet.</p>
        )}
        </div>
    </>
  )
}

export default HomePage
