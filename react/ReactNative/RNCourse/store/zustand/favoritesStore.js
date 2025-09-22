// stores/favoritesStore.js
import { create } from "zustand";

const useFavoritesStore = create((set) => ({
    favorites: [],

    addFavorite: (id) =>
        set((state) => ({
            favorites: [...state.favorites, id],
        })),

    removeFavorite: (id) =>
        set((state) => ({
            favorites: state.favorites.filter((favId) => favId !== id),
        })),

    isFavorite: (id) => get().favorites.includes(id),
}));

export default useFavoritesStore;
