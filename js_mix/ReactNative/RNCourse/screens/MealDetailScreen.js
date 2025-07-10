import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { MEALS } from "../data/dummy-data";
import MealDetail from "../components/MealDetail";

const MealDetailScreen = ({ route }) => {
    const mealId = route.params.mealId;

    const selectedMeal = MEALS.find((meal) => meal.id === mealId);

    return (
        <View>
            <Image source={{ uri: selectedMeal.imageUrl }} />
            <Text>{selectedMeal.title}</Text>
            <MealDetail {...selectedMeal} />
            <Text>Ingredients</Text>
            <FlatList data={selectedMeal.ingredients} keyExtractor={(item) => item} renderItem={(itemData) => <Text>{itemData.item}</Text>} />
            <Text>Steps</Text>
            <FlatList data={selectedMeal.steps} keyExtractor={(item) => item} renderItem={(itemData) => <Text>{itemData.item}</Text>} />
        </View>
    );
};

export default MealDetailScreen;

const styles = StyleSheet.create({});
