import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

import EvilIcons from "@expo/vector-icons/EvilIcons";
import { ms, mvs } from "react-native-size-matters";

const Search = () => {
    return (
        <View style={styles.container}>
            <EvilIcons name="search" style={styles.icon} />
            <TextInput placeholder="Search" style={styles.input} />
        </View>
    );
};

export default Search;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        position: "relative",
        marginHorizontal: ms(30),
        marginBottom: mvs(20),
    },
    icon: {
        color: "rgba(192, 192, 192, 1)",
        fontSize: ms(30),
        position: "absolute",
        left: ms(10),
        top: mvs(10),
        zIndex: 1,
    },
    input: {
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderRadius: ms(12),
        flex: 1,
        paddingLeft: ms(48),
        paddingRight: ms(20),
        paddingTop: mvs(15),
        height: mvs(48),
        fontFamily: "Poppins-Regular",
        fontWeight: "400",
        fontSize: ms(16),
        color: "rgba(0, 0, 0, 1)",
    },
});
