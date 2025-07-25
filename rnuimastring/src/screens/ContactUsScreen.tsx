import { StyleSheet, Text, View } from "react-native";
import React from "react";
import UserAvatar from "../components/UserAvatar";
import BackButton from "../components/BackButton";
import { s, vs } from "react-native-size-matters";
import SendButton from "../components/SendButton";
import SocialCircle from "../components/SocialCircle";
import SocialSection from "../components/SocialSection";

const ContactUsScreen = () => {
    return (
        <View style={{ marginTop: s(50), paddingHorizontal: vs(16) }}>
            <View style={styles.header}>
                <BackButton />
                <UserAvatar />
            </View>
            <SocialSection />
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
