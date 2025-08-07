import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ms, mvs } from "react-native-size-matters";

const Title = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Food</Text>
            <Text style={styles.textTitle}>Delivery</Text>
        </View>
    );
};

export default Title;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: ms(20),
        marginBottom: mvs(30),
    },
    text: {
        fontFamily: "Montserrat-Regular",
        fontWeight: "400",
        fontSize: ms(16),
        color: "#313234",
        marginBottom: mvs(5),
    },
    textTitle: {
        fontFamily: "Montserrat-Regular",
        fontWeight: "700",
        fontSize: ms(32),
        color: "#313234",
    },
});
