import { Button, FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useLayoutEffect } from "react";
import { MEALS } from "../data/dummy-data";
import MealDetail from "../components/MealDetail";
import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";
import { useNavigation } from "@react-navigation/native";
import IconButton from "../components/IconButton";
// import { FavoritesContext } from "../store/context/favorites-context";
// import { useDispatch, useSelector } from "react-redux";
// import { addFavorite, removeFavorite } from "../store/redux/favorites";
import useFavoritesStore from "../store/zustand/favoritesStore";

const MealDetailScreen = ({ route }) => {
    // const favoriteMealctx = useContext(FavoritesContext);

    // const favoriteMealIds = useSelector((state) => state.favoritesMeals.ids);
    // const dispatch = useDispatch();

    // zustand
    const favorites = useFavoritesStore((state) => state.favorites);
    const addFavorite = useFavoritesStore((state) => state.addFavorite);
    const removeFavorite = useFavoritesStore((state) => state.removeFavorite);
    // zustand

    const mealId = route.params.mealId;

    const selectedMeal = MEALS.find((meal) => meal.id === mealId);

    const navigation = useNavigation();

    const mealIsFavorite = favorites.includes(mealId);

    const handerButtonPress = () => {
        console.log(mealIsFavorite);
        if (mealIsFavorite) {
            // favoriteMealctx.removeFavorite(mealId);
            // dispatch(removeFavorite({ id: mealId }));
            removeFavorite(mealId);
        } else {
            // favoriteMealctx.addFavorite(mealId);
            // dispatch(addFavorite({ id: mealId }));
            addFavorite(mealId);
        }
    };

    const dataIconButton = {
        icon: mealIsFavorite ? "star" : "star-outline",
        color: "white",
        onPress: handerButtonPress,
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return <IconButton {...dataIconButton} />;
            },
        });
    }, [navigation, dataIconButton]);

    return (
        <ScrollView style={styles.rootContainer}>
            <View>
                <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
                <Text style={styles.title}>{selectedMeal.title}</Text>
                <MealDetail {...{ ...selectedMeal, textStyle: styles.detailText }} />
                <View style={styles.listOuterContainer}>
                    <View style={styles.listContainer}>
                        <Subtitle text="Ingredients" />
                        <List data={selectedMeal.ingredients} />
                        <Subtitle text="Steps" />
                        <List data={selectedMeal.steps} />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default MealDetailScreen;

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 350,
    },
    title: {
        fontWeight: "bold",
        fontSize: 24,
        margin: 8,
        textAlign: "center",
        color: "white",
    },
    detailText: {
        color: "white",
    },
    listContainer: {
        width: "80%",
    },
    listOuterContainer: {
        alignItems: "center",
    },
    rootContainer: {
        marginBottom: 32,
    },
});
