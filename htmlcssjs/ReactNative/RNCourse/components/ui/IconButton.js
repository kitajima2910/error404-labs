import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const IconButton = ({ icon, size, color, onPress }) => {
    return (
        <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
            <View style={styles.buttonContainer}>
                <Ionicons name={icon} size={size} color={color} />
            </View>
        </Pressable>
    );
};

export default IconButton;

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 25,
        padding: 6,
        marginHorizontal: 8,
        marginVertical: 4,
    },
    pressed: {
        opacity: 0.7,
    },
});
