import  {create} from 'zustand';
import { devtools } from 'zustand/middleware';
import { createRecipeSlice, RecipeSliceType } from './recipeSlice';
import { createFavoriteSlice, FavoriteSliceType } from './favoriteSlice';
import { createNotificacionSlice, NotificationSliceType } from './notificationSlice';
import { AISlice, createAISlice } from './aiSlice';

export const useAppStore = create<RecipeSliceType & FavoriteSliceType & NotificationSliceType & AISlice>()(devtools((...a) => ({
    ...createRecipeSlice(...a),
    ...createFavoriteSlice(...a),
    ...createNotificacionSlice(...a),
    ...createAISlice(...a)
})))