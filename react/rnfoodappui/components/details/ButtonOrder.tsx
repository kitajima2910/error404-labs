import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ms, mvs } from "react-native-size-matters";

const ButtonOrder = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Place an order</Text>
            <Ionicons style={styles.icon} name="chevron-forward" />
        </View>
    );
};

export default ButtonOrder;

const styles = StyleSheet.create({
    container: {
        width: ms(335),
        height: mvs(62),
        borderRadius: ms(50),
        backgroundColor: "rgba(245, 202, 72, 1)",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: ms(20),
        marginBottom: mvs(48),
    },
    text: {
        fontFamily: "Montserrat-Bold",
        fontWeight: "700",
        fontSize: ms(14),
        color: "rgba(0, 0, 0, 1)",
        marginRight: ms(10),
    },
    icon: {
        fontSize: ms(20),
        color: "rgba(0, 0, 0, 1)",
    },
});
