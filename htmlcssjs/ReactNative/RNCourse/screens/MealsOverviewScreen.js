import { StyleSheet } from "react-native";
import { useLayoutEffect } from "react";
import { CATEGORIES, MEALS } from "../data/dummy-data";
import MealList from "../components/MealList/MealList";

const MealsOverviewScreen = ({ route, navigation }) => {
    const catId = route.params.categoryId;

    const displayMeals = MEALS.filter((meal) => meal.categoryIds.indexOf(catId) >= 0);

    useLayoutEffect(() => {
        const categoryTitle = CATEGORIES.find((cat) => cat.id === catId).title;

        navigation.setOptions({
            title: categoryTitle,
        });
    }, []);

    return <MealList displayMeals={displayMeals} />;
};

export default MealsOverviewScreen;

const styles = StyleSheet.create({});
