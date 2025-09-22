import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

const GoalItem = (props) => {
    const deleteGoalHandler = () => {
        props.onDeleteGoal(props.id);
    }

    return (
        <View style={styles.goalItem}>
            <Pressable android_ripple={{ color: "#210644" }} style={({ pressed }) => pressed && styles.pressedItem} onPress={deleteGoalHandler}>
                <Text style={styles.goalText}>{props.text}</Text>
            </Pressable>
        </View>
    );
};

export default (GoalItem);

const styles = StyleSheet.create({
    goalItem: {
        margin: 8,
        borderRadius: 6,
        backgroundColor: "#1e085a",
        color: "white",
    },
    pressedItem: {
        opacity: 0.5,
    },
    goalText: {
        color: "white",
        padding: 8,
    },
});
