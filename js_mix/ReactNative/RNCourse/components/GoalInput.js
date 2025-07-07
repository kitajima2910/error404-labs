import React, { useCallback } from "react";
import { Button, Image, Modal, StyleSheet, TextInput, View } from "react-native";

const GoalInput = (props) => {
    const onChangeTextHandler = useCallback((text) => {
            props.onChangeText(text);
    },[props.onChangeText]);

    const onAddGoalHandler = useCallback(() => {
        props.onAddGoal(props.value);
    }, [props.onAddGoal, props.value]);

    const cancelModelHandler = useCallback(() => {
        props.onCancel();
    }, [props.onCancel]);

    return (
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.inputContainer}>
                <Image style={styles.image} source={require("../assets/images/goal.png")} />
                <TextInput style={styles.textInput} placeholder="Your course goal!" onChangeText={onChangeTextHandler} value={props.value} />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title="Add Goal" color="#b180f0" onPress={onAddGoalHandler} />
                    </View>
                    <View style={styles.button}>
                        <Button title="Cancel" color="#f31282" onPress={cancelModelHandler} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default React.memo(GoalInput);

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginBottom: 24,
        backgroundColor: "#5e0acc",
        padding: 16,
    },
    image: {
        width: 100,
        height: 100,
        margin: 20,
    },
    textInput: {
        borderWidth: 1,
        borderColor: "#e4d0ff",
        backgroundColor: "#e4d0ff",
        color: "#120438",
        borderRadius: 6,
        width: "100%",
        padding: 8,
    },
    buttonContainer: {
        flexDirection: "row",
        marginTop: 16,
    },
    button: {
        width: "30%",
        marginHorizontal: 8,
    }
});
