import { Button, StyleSheet, TextInput, View } from "react-native";

const GoalInput = (props) => {
    return (
        <View style={styles.inputContainer}>
            <TextInput style={styles.textInput} placeholder="Your course goal!" onChangeText={props.onChangeText} value={props.value} />
            <Button title="Add Goal" onPress={props.onAddGoal} />
        </View>
    );
};

export default GoalInput;

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
