import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SendButton from "./SendButton";
import SocialCircle from "./SocialCircle";
import { s } from "react-native-size-matters";

const SocialSection = () => {
    return (
        <View style={styles.container}>
            <SocialCircle />
            <Text style={styles.text}>WhatsApp</Text>
            <SendButton />
        </View>
    );
};

export default SocialSection;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#E4E6E8",
        paddingVertical: s(15),
    },
    text: {
        flex: 1,
        marginStart: s(14),
        fontSize: s(12),
        color: "#8083A3",
    },
});
