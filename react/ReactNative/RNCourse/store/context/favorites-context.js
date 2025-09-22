import { createContext, useState } from "react";

export const FavoritesContext = createContext({
    ids: [],
    addFavorite: (id) => {},
    removeFavorite: (id) => {},
});

const FavoritesContextProvider = ({ children }) => {
    const [favoriteMealIds, setFavoriteMealIds] = useState([]);

    const addFavoriteHandler = (id) => {
        setFavoriteMealIds((currentIds) => [...currentIds, id]);
    };

    const removeFavoriteHandler = (id) => {
        setFavoriteMealIds((currentIds) => currentIds.filter((mealId) => mealId !== id));
    };

    const value = {
        ids: favoriteMealIds,
        addFavorite: addFavoriteHandler,
        removeFavorite: removeFavoriteHandler,
    };

    return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

export default FavoritesContextProvider;
