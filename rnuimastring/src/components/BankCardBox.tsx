import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { s, vs } from "react-native-size-matters";
import { CardIcon } from "../assets/icons";

const BankCardBox = () => {
    return (
        <View style={styles.container}>
            <CardIcon style={{ marginBottom: vs(18) }} />
            <Text style={{ marginBottom: vs(18), fontFamily: "Montserrat-SemiBold", fontWeight: "700", fontSize: s(16) }}>No master card added</Text>
            <Text style={{ fontFamily: "Montserrat-Regular", fontWeight: "400", fontSize: s(15), textAlign: "center", letterSpacing: 0.5, width: s(286) }}>You can add a mastercard and save it for later</Text>
        </View>
    );
};

export default BankCardBox;

const styles = StyleSheet.create({
    container: {
        marginTop: vs(25),
        width: s(327),
        height: vs(257),
        backgroundColor: "#F7F8F9",
        borderRadius: s(10),
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
});
