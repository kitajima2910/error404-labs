import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ms, mvs } from "react-native-size-matters";

const ButtonDetail = () => {
    return (
        <View style={styles.container}>
            <View style={styles.wrapperButton}>
                <Text style={styles.text}>Add to Cart</Text>
            </View>
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
        fontFamily: "Poppins-Regular",
        fontWeight: "500",
        fontSize: ms(20),
        color: "rgba(255, 255, 255, 1)",
    },
});
