import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ms, mvs } from "react-native-size-matters";

type Props = {
    title: string;
};

const Title = (props: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
        </View>
    );
};

export default Title;

const styles = StyleSheet.create({
    container: {},
    title: {
        fontFamily: "Poppins-Regular",
        fontWeight: "400",
        fontSize: ms(28),
        color: "rgba(0, 0, 0, 1)",
        marginHorizontal: ms(30),
        marginBottom: mvs(10),
    },
});
