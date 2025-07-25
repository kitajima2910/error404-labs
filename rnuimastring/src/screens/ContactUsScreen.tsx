import { StyleSheet, Text, View } from "react-native";
import React from "react";
import UserAvatar from "../components/UserAvatar";
import BackButton from "../components/BackButton";
import { s, vs } from "react-native-size-matters";

const ContactUsScreen = () => {
    return (
        <View style={{ marginTop: s(50), paddingHorizontal: vs(16) }}>
            <View style={styles.header}>
                <BackButton />
                <UserAvatar />
            </View>
        </View>
    );
};

export default ContactUsScreen;

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});
