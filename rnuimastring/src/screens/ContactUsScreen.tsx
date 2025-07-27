import { StyleSheet, Text, View } from "react-native";
import React from "react";
import UserAvatar from "../components/UserAvatar";
import BackButton from "../components/BackButton";
import { s, vs } from "react-native-size-matters";
import SocialSection from "../components/SocialSection";
import Ionicons from "@expo/vector-icons/Ionicons";

const ContactUsScreen = () => {
    return (
        <View style={{ marginTop: s(50), paddingHorizontal: vs(16) }}>
            <View style={styles.header}>
                <BackButton />
                <UserAvatar />
            </View>
            <Text style={styles.scocialScreen}>Contact Us</Text>
            <View style={styles.scocialContainer}>
                <Text style={styles.scocialTitle}>Social Media Platforms</Text>
                <SocialSection icon={<Ionicons name="logo-whatsapp" size={24} color="#178AD9" />} title="WhatsApp" />
                <SocialSection icon={<Ionicons name="logo-twitter" size={24} color="#178AD9" />} title="Twitter" />
                <SocialSection icon={<Ionicons name="logo-instagram" size={24} color="#178AD9" />} title="Instagram" />
                <SocialSection icon={<Ionicons name="logo-snapchat" size={24} color="#178AD9" />} title="Snap chat" />
                <SocialSection icon={<Ionicons name="logo-tiktok" size={24} color="#178AD9" />} title="Tik Tok" />
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
    scocialContainer: {
        backgroundColor: "#F5F5FA",
        paddingLeft: s(20),
        paddingRight: s(18),
        paddingTop: vs(26),
        paddingBottom: vs(38),
        borderRadius: s(14),
    },
    scocialTitle: {
        color: "#000000",
        fontSize: s(16),
        fontFamily: "semibold",
        fontWeight: "600",
    },
    scocialScreen: {
        color: "#000000",
        fontSize: s(30),
        fontFamily: "semibold",
        marginBottom: vs(20),
        fontWeight: "600",
        marginTop: vs(20),
        marginStart: s(19),
    },
});
