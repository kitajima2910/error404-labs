import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { ms, mvs } from "react-native-size-matters";

const Search = () => {
    return (
        <View style={styles.container}>
            <Ionicons
                style={styles.icon}
                name="search"
                size={ms(25)}
                color="black"
            />
            <TextInput
                style={styles.input}
                placeholder="Search..."
                placeholderTextColor={"#CDCDCD"}
            />
        </View>
    );
};

export default Search;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: ms(20),
        marginBottom: mvs(30),
    },
    icon: {
        marginRight: ms(10),
        paddingTop: mvs(13),
    },
    input: {
        flex: 1,
        borderBottomWidth: ms(2),
        borderColor: "#CDCDCD",
        padding: ms(2),
        fontSize: ms(15),
    },
});
