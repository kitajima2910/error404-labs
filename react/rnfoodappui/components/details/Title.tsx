import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ms, mvs } from "react-native-size-matters";

type Props = {
    title: string;
};

const Title = (props: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.title}</Text>
        </View>
    );
};

export default Title;

const styles = StyleSheet.create({
    container: {
        marginBottom: mvs(20),
    },
    text: {
        fontFamily: "Montserrat-Regular",
        fontWeight: "700",
        fontSize: ms(32),
        color: "#313234",
        paddingStart: ms(20),
        width: ms(172),
    },
});
