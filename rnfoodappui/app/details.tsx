import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ms } from "react-native-size-matters";

const details = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Ionicons name="arrow-back" size={ms(24)} color="black" />
            </TouchableOpacity>
        </View>
    );
};

export default details;

const styles = StyleSheet.create({
    container: {
        paddingTop: ms(10),
    },
});
