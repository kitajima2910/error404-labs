import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
    const [enteredGoalText, setEnteredGoalText] = useState("");
    const [courseGoals, setCourseGoals] = useState([]);

    const goalInputHandler = (enteredText) => {
        setEnteredGoalText(enteredText);
    };

    const addGoadHandler = () => {
        setCourseGoals((currentCourseGoals) => [...currentCourseGoals, { text: enteredGoalText, key: Math.random().toString() }]);
		setEnteredGoalText("");
    };

    return (
        <View style={styles.appContainer}>
            <GoalInput onAddGoal={addGoadHandler} onChangeText={goalInputHandler} value={enteredGoalText} />
            <View style={styles.goalsContainer}>
                <FlatList
                    alwaysBounceVertical={false}
                    data={courseGoals}
                    renderItem={(itemData) => {
                        return <GoalItem text={itemData.item.text} />;
                    }}
                    keyExtractor={(item, index) => {
                        return item.key;
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        padding: 50,
        paddingHorizontal: 16,
    },
    goalsContainer: {
        flex: 5,
    },
});
