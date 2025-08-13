import NewsCard from "@/components/NewsCard";
import { useCategoryStore } from "@/stores/categoryStore";
import { useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { ms, mvs } from "react-native-size-matters";

const CategoryScreen = () => {
    const COUNTRY = "us";

    const route = useRoute<any>();
    const { category } = route.params;

    const { fetchCategories, loading, categories } = useCategoryStore();

    useEffect(() => {
        fetchCategories(COUNTRY, category);
    }, [category, fetchCategories]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{`Top Headlines in ${COUNTRY}`}</Text>
            {loading ? (
                <ActivityIndicator size={"large"} color="red" />
            ) : (
                <FlatList
                    data={categories}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <NewsCard {...item} />}
                />
            )}
        </View>
    );
};

export default CategoryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
    },
    title: {
        fontSize: ms(26),
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#000",
        width: "100%",
        color: "#fff",
        padding: ms(10),
        marginBottom: mvs(20),
    },
});
