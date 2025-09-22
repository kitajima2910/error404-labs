import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { FavoritesContext } from "../store/context/favorites-context";
import { MEALS } from "../data/dummy-data";
import MealList from "../components/MealList/MealList";
import { useSelector } from "react-redux";
import useFavoritesStore from "../store/zustand/favoritesStore";

const FavoritesScreen = () => {
    // const favoritesMealsCtx = useContext(FavoritesContext);

    const favorites = useFavoritesStore((state) => state.favorites);

    // const favoritesMealsIds = useSelector((state) => state.favoritesMeals.ids);

    const favoriteMeals = MEALS.filter((meal) => favorites.includes(meal.id));

    if (favoriteMeals.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ textAlign: "center", fontSize: 16, color: "white" }}>No favorite meals found. Start adding some!</Text>
            </View>
        );
    }

    return <MealList displayMeals={favoriteMeals} />;
};

export default FavoritesScreen;

const styles = StyleSheet.create({});
