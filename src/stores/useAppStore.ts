import  {create} from 'zustand';
import { devtools } from 'zustand/middleware';
import { createRecipeSlice, RecipeSliceType } from './recipeSlice';
import { createFavoriteSlice, FavoriteSliceType } from './favoriteSlice';
import { createNotificacionSlice, NotificationSliceType } from './notificationSlice';

export const useAppStore = create<RecipeSliceType & FavoriteSliceType & NotificationSliceType>()(devtools((...a) => ({
    ...createRecipeSlice(...a),
    ...createFavoriteSlice(...a),
    ...createNotificacionSlice(...a)
})))