import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ms, mvs } from "react-native-size-matters";

const Header = () => {
    const goBack = () => {
        router.back();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={goBack} style={styles.containerIconBack}>
                <Ionicons style={styles.iconBack} name="chevron-back-outline" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.containerIconStar}>
                <Ionicons style={styles.iconStar} name="star" color="white" />
            </TouchableOpacity>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: ms(20),
        marginBottom: mvs(30),
    },
    containerIconBack: {
        width: ms(40),
        height: mvs(40),
        borderWidth: ms(2),
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#cdcdcd",
        borderRadius: ms(10),
    },
    iconBack: {
        fontSize: ms(15),
    },
    containerIconStar: {
        width: ms(40),
        height: mvs(40),
        borderWidth: ms(2),
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#f5ca48",
        backgroundColor: "#f5ca48",
        borderRadius: ms(10),
    },
    iconStar: {
        fontSize: ms(15),
    },
});
