import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { s } from "react-native-size-matters";

type Props = {
    icon: React.ReactNode;
};

const SocialCircle: FC<Props> = ({ icon }) => {
    return <View style={styles.circle}>{icon}</View>;
};

export default SocialCircle;

const styles = StyleSheet.create({
    circle: {
        width: s(46),
        height: s(46),
        borderRadius: s(23),
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E4E6E8",
    },
});
