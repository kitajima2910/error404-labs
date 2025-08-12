// eslint-disable-next-line import/no-unresolved
import { API_NEWS_KEY } from "@env";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
} from "react-native";

const HomeScreen = () => {
    const COUNTRY = "us";
    const [news, setNews] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchNews = async () => {
        const newsUrl = `https://newsapi.org/v2/top-headlines?country=${COUNTRY}&apiKey=${API_NEWS_KEY}`;
        try {
            const res = await axios.get(newsUrl);
            setNews(res.data.articles);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{`Top Headlines in ${COUNTRY}`}</Text>
            {loading ? (
                <ActivityIndicator size={"large"} color="red" />
            ) : (
                <FlatList
                    data={news}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <Text>{item.title}</Text>}
                />
            )}
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {},
});
