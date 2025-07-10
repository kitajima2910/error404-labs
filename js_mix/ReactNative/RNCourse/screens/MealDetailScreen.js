import { FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { MEALS } from "../data/dummy-data";
import MealDetail from "../components/MealDetail";
import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";

const MealDetailScreen = ({ route }) => {
    const mealId = route.params.mealId;

    const selectedMeal = MEALS.find((meal) => meal.id === mealId);

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
