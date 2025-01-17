import {StateCreator} from 'zustand'
import { Recipe } from '../types'
import {createRecipeSlice, RecipeSliceType} from './recipeSlice'
import { createNotificacionSlice, NotificationSliceType } from './notificationSlice'


export type FavoriteSliceType = {
    favorites: Recipe[]
    handleClickFavorite: (recipe: Recipe) => void
    favoriteExists: (id: Recipe['idDrink']) => boolean
    loadFromStorage: () => void

}
//se agrega los otros tipos para hacer slices anidados, que se conecta a traves de sus types.
export const createFavoriteSlice : StateCreator<FavoriteSliceType & RecipeSliceType & NotificationSliceType, [], [], FavoriteSliceType> = (set, get, api) => ({ 
    favorites: [],
    handleClickFavorite: (recipe) => {
        if(get().favoriteExists(recipe.idDrink)) {
            set((state) => ({
                favorites: state.favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)
            }))
            createNotificacionSlice(set, get, api).showNotification({text: 'Deleted from Favorite', error: false})
        } else {
            set((state) => ({
                favorites: [...state.favorites, recipe]
            }))
            createNotificacionSlice(set, get, api).showNotification({text: 'Added to Favorite', error: true})

        }
        createRecipeSlice(set, get, api).closeModal()
        localStorage.setItem('favorites', JSON.stringify(get().favorites)) //agregandolo al storage
    },
    //existe o no fav en el state
    favoriteExists: (id) => {
        return get().favorites.some(favorite => favorite.idDrink === id)
    },

    //mostrar los favoritos
    loadFromStorage: () => {
        const storedFavorites = localStorage.getItem('favorites')
        if(storedFavorites) {
            set({
                favorites: JSON.parse(storedFavorites)
            })
        }
    }
})

//Slice Patern