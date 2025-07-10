import { StyleSheet, Text, View } from "react-native";
import React from "react";

const MealDetail = ({ duration, complexity, affordability }) => {
    return (
        <View style={styles.details}>
            <Text style={styles.detailItem}>{duration}m</Text>
            <Text style={styles.detailItem}>{complexity?.toUpperCase()}</Text>
            <Text style={styles.detailItem}>{affordability?.toUpperCase()}</Text>
        </View>
    );
};

export default MealDetail;

const styles = StyleSheet.create({
    details: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
    },
    detailItem: {
        marginHorizontal: 4,
        fontSize: 12,
    },
});
