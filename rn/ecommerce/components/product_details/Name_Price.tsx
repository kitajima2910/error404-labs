import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ms, mvs } from "react-native-size-matters";

const Name_Price = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.name}>Winter Coat</Text>
            <Text style={styles.price}>$65.9</Text>
        </View>
    );
};

export default Name_Price;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: ms(30),
        marginBottom: mvs(30),
    },
    name: {
        fontFamily: "Poppins-SemiBold",
        fontWeight: "500",
        fontSize: ms(20),
        color: "rgba(68, 68, 68, 1)",
    },
    price: {
        fontFamily: "Poppins-SemiBold",
        fontWeight: "600",
        fontSize: ms(20),
        color: "rgba(77, 76, 76, 1)",
    },
});
