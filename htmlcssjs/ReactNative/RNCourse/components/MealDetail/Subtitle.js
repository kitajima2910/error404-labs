import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Subtitle = ({ text }) => {
    return (
        <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>{text}</Text>
        </View>
    );
};

export default Subtitle;

const styles = StyleSheet.create({
    subtitle: {
        color: "#e2b497",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
    subtitleContainer: {
        padding: 6,
        margin: 4,
        borderBottomColor: "#e2b497",
        borderBottomWidth: 2,
        marginHorizontal: 12,
        marginVertical: 4,
    },
});
