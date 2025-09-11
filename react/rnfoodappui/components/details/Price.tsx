import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { mvs } from "react-native-size-matters";

type Props = {
    price: string;
};

const Price = (props: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>${props.price}</Text>
        </View>
    );
};

export default Price;

const styles = StyleSheet.create({
    container: {
        marginBottom: mvs(30),
    },
    text: {
        fontFamily: "Montserrat-Blod",
        fontWeight: "600",
        fontSize: mvs(32),
        color: "#E4723C",
        paddingStart: mvs(20),
    },
});
