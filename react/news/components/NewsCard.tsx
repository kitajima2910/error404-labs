import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ms, mvs } from "react-native-size-matters";

type Props = {
    urlToImage: string;
    title: string;
    description: string;
    author: string;
};

const NewsCard = (props: Props) => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: props.urlToImage }} />
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.description}>{props.description}</Text>
            <Text style={styles.author}>{props.author}</Text>
        </View>
    );
};

export default NewsCard;

const styles = StyleSheet.create({
    container: {
        padding: ms(15),
        marginBottom: mvs(20),
        backgroundColor: "#eee",
    },
    image: {
        width: "100%",
        height: mvs(300),
        borderRadius: mvs(3),
        marginBottom: mvs(10),
    },
    title: {
        fontWeight: "700",
        fontSize: ms(20),
        marginBottom: mvs(15),
    },
    description: {},
    author: {
        fontStyle: "italic",
        fontWeight: "600",
    },
});
