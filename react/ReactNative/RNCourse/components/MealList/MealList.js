import { FlatList, StyleSheet, Text, View } from "react-native";
import MealItem from "./MealItem";

const MealList = ({ displayMeals }) => {
    function renderMealItem({ item }) {
        const mealItemPrps = {
            id: item.id,
            title: item.title,
            imageUrl: item.imageUrl,
            duration: item.duration,
            affordability: item.affordability,
            complexity: item.complexity,
        };

        return <MealItem {...mealItemPrps} />;
    }

    return (
        <View style={styles.container}>
            <FlatList data={displayMeals} renderItem={renderMealItem} keyExtractor={(item) => item.id} />
        </View>
    );
};

export default MealList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
