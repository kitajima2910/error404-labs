import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import SendButton from "./SendButton";
import SocialCircle from "./SocialCircle";
import { s, vs } from "react-native-size-matters";

type Props = {
    title: string;
    icon: React.ReactNode;
};

const SocialSection: FC<Props> = ({ title, icon }) => {
    return (
        <View style={styles.container}>
            <SocialCircle icon={icon} />
            <Text style={styles.text}>{title}</Text>
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
        paddingVertical: vs(15),
    },
    text: {
        flex: 1,
        marginStart: s(14),
        fontSize: s(12),
        color: "#8083A3",
    },
});
