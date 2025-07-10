import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";

const List = ({ data }) => {
    const dataMap = data.map((itemData, index) => (
        <View style={styles.listItem} key={`${index}`}>
            <Text style={styles.listItemText}>{itemData}</Text>
        </View>
    ));

    return <>{dataMap}</>;
};

export default List;

const styles = StyleSheet.create({
    listItem: {
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginVertical: 4,
        marginHorizontal: 12,
        backgroundColor: "#e2b497",
    },
    listItemText: {
        color: "#351401",
        textAlign: "center",
    },
});
