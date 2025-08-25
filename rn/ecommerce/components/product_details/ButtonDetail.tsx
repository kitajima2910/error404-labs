import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ms, mvs } from "react-native-size-matters";

const ButtonDetail = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.wrapperButton}>
                <Text style={styles.text}>Add to Cart</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ButtonDetail;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: ms(30),
        marginBottom: mvs(30),
    },
    wrapperButton: {
        width: "100%",
        height: mvs(60),
        backgroundColor: "rgba(229, 91, 91, 1)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: ms(20),
    },
    text: {
        fontFamily: "Poppins-SemiBold",
        fontWeight: "500",
        fontSize: ms(18),
        color: "rgba(255, 255, 255, 1)",
    },
});
