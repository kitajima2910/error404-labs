import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { AddIcon } from "../assets/icons";
import { ms } from "react-native-size-matters";

const AddNewButton = () => {
    return (
        <TouchableOpacity>
            <View style={styles.content}>
                <AddIcon style={styles.icon} />
                <Text style={styles.text}>add new</Text>
            </View>
        </TouchableOpacity>
    );
};

export default AddNewButton;

const styles = StyleSheet.create({
    content: {
        display: "flex",
        flexDirection: "row",
        paddingVertical: ms(25),
        backgroundColor: "#fff",
        justifyContent: "center",
        borderRadius: ms(10),
        borderWidth: ms(2),
        borderColor: "#F0F5FA",
        marginHorizontal: ms(24),
        marginTop: ms(15)
    },
    text: {
        color: "#FF7622",
        fontSize: ms(14),
        fontWeight: "700",
        fontFamily: "Montserrat-SemiBold",
        textTransform: "uppercase",
    },
    icon: {
        marginRight: ms(10),
    }
});
