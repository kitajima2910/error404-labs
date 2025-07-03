import React, { useCallback } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

const GoalInput = (props) => {

    const onChangeTextHandler = useCallback((text) => {
        props.onChangeText(text)
    }, [props.onChangeText])

    const onAddGoalHandler = useCallback(() => {
        props.onAddGoal(props.value)
    }, [props.onAddGoal, props.value])

    return (
        <View style={styles.inputContainer}>
            <TextInput style={styles.textInput} placeholder="Your course goal!" onChangeText={onChangeTextHandler} value={props.value} />
            <Button title="Add Goal" onPress={onAddGoalHandler} />
        </View>
    );
};

export default React.memo(GoalInput);

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    textInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        width: "70%",
        marginRight: 8,
        padding: 8,
    },
});
