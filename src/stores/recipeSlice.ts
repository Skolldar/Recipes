import { StateCreator } from "zustand"
import {drinksDetails, getCategories, getRecipes} from "../services/RecipeServices"
import type { Categories, Drinks, SearchFilter, Drink, Recipe } from "../types"
import { FavoriteSliceType } from "./favoriteSlice"


export type RecipeSliceType = {
    categories: Categories
    drinks: Drinks
    selectedRecipe: Recipe
    modal: boolean
    fetchCategories: () => Promise<void>
    searchRecipes: (searchFilters: SearchFilter) => Promise<void> 
    selectRecipe: (id: Drink['idDrink'] ) => Promise<void>
    closeModal: () => void
}


export const createRecipeSlice : StateCreator<RecipeSliceType & FavoriteSliceType, [], [], RecipeSliceType > = (set) => ({
    categories:{
        drinks: []
    },
    drinks:{
        drinks: []
    },
    selectedRecipe: {} as Recipe,
    modal: false,
    //action:
    fetchCategories: async () => {
        const categories = await getCategories()
        set({
            categories
        })
    },
    searchRecipes: async (filters) => {
      const drinks = await getRecipes(filters);
      set({
        drinks
      })
    },
    selectRecipe: async (id) => {
       const selectedRecipe = await drinksDetails(id)
       set({
            selectedRecipe,
            modal: true
       })
    },
    closeModal: () => {
       set({
         modal: false,
         selectedRecipe: {} as Recipe
       }) 
    }
})