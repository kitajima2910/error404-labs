import NewsCard from "@/components/NewsCard";
import { useNewsStore } from "@/stores/newsStore";
import React, { useEffect } from "react";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { ms, mvs } from "react-native-size-matters";

const HomeScreen = () => {
    const COUNTRY = "us";

    const { fetchNews, loading, articles } = useNewsStore();

    useEffect(() => {
        fetchNews(COUNTRY);
    }, [fetchNews]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{`Top Headlines in ${COUNTRY}`}</Text>
            {loading ? (
                <ActivityIndicator size={"large"} color="red" />
            ) : (
                <FlatList
                    data={articles}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <NewsCard {...item} />}
                />
            )}
        </View>
    );
};

export default HomeScreen;

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
