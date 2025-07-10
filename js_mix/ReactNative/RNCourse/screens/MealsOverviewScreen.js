import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { MEALS } from "../data/dummy-data";
import MealItem from "../components/MealItem";

const MealsOverviewScreen = ({ route }) => {
    const catId = route.params.categoryId;

    const displayMeals = MEALS.filter((meal) => meal.categoryIds.indexOf(catId) >= 0);

    const renderMealItem = ({ item }) => {
        const mealItemPrps = {
            title: item.title,
            imageUrl: item.imageUrl,
            duration: item.duration,
            affordability: item.affordability,
            complexity: item.complexity,
        };

        return <MealItem {...mealItemPrps} />;
    };

    return (
        <View style={styles.container}>
            <FlatList data={displayMeals} renderItem={renderMealItem} keyExtractor={(item) => item.id} />
        </View>
    );
};

export default MealsOverviewScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
