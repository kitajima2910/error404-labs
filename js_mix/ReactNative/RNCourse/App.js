import { useCallback, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
    const [enteredGoalText, setEnteredGoalText] = useState("");
    const [courseGoals, setCourseGoals] = useState([]);

    const goalInputHandler = useCallback((enteredText) => {
        setEnteredGoalText(enteredText);
    }, []);

    const addGoalHandler = useCallback(() => {
        setCourseGoals((currentCourseGoals) => [...currentCourseGoals, { text: enteredGoalText, id: Math.random().toString() }]);
        setEnteredGoalText("");
    }, [enteredGoalText]);

    const deleteGoalHandler = useCallback((id) => {
        setCourseGoals((currentCourseGoals) => currentCourseGoals.filter((item) => item.id !== id));
    }, []);

    return (
        <View style={styles.appContainer}>
            <GoalInput onAddGoal={addGoalHandler} onChangeText={goalInputHandler} value={enteredGoalText} />
            <View style={styles.goalsContainer}>
                <FlatList
                    alwaysBounceVertical={false}
                    data={courseGoals}
                    renderItem={(itemData) => {
                        return <GoalItem text={itemData.item.text} onDeleteGoal={deleteGoalHandler} id={itemData.item.id} />;
                    }}
                    keyExtractor={(item, index) => {
                        return item.id;
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
