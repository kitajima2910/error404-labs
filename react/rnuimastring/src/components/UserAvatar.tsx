import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { s } from "react-native-size-matters";

const UserAvatar = () => {
    return (
        <View>
            <Image source={require("../assets/midcodekid.jpg")} style={styles.avatar} />
        </View>
    );
};

export default UserAvatar;

const styles = StyleSheet.create({
    avatar: {
        width: s(32),
        height: s(32),
        borderRadius: s(16),
    },
});
