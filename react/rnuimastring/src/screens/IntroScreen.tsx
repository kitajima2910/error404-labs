import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import FoodLogo from "../assets/FoodLogo";
import SunImage from "../assets/SunImage";

const IntroScreen = () => {
    return (
        <View style={styles.container}>
            <FoodLogo />
            <SunImage style={styles.sunImg} />
        </View>
    );
};

export default IntroScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
    sunImg: {
        position: "absolute",
        bottom: 0,
        right: 0,
    },
});
