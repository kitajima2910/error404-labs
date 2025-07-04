import { useCallback, useState } from "react";
import { Button, FlatList, StyleSheet, View } from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";
import { StatusBar } from "expo-status-bar";

export default function App() {
    const [enteredGoalText, setEnteredGoalText] = useState("");
    const [courseGoals, setCourseGoals] = useState([]);
    const [startVisibleModal, setStartVisibleModal] = useState(false);

    const goalInputHandler = useCallback((enteredText) => {
        setEnteredGoalText(enteredText);
    }, []);

    const addGoalHandler = useCallback(() => {
        setCourseGoals((currentCourseGoals) => [...currentCourseGoals, { text: enteredGoalText, id: Math.random().toString() }]);
        setEnteredGoalText("");

        cancelModelHandler();
    }, [enteredGoalText]);

    const deleteGoalHandler = useCallback((id) => {
        setCourseGoals((currentCourseGoals) => currentCourseGoals.filter((item) => item.id !== id));
    }, []);

    const startAddGoalHandler = () => {
        setStartVisibleModal(true);
    };

    const cancelModelHandler = useCallback(() => {
        setStartVisibleModal(false);
    }, []);

    return (
        <>
            <StatusBar style="light" />
            <View style={styles.appContainer}>
                <Button title="Add New Goal" color={"#b180f0"} onPress={startAddGoalHandler} />
                <GoalInput onAddGoal={addGoalHandler} onChangeText={goalInputHandler} value={enteredGoalText} visible={startVisibleModal} onCancel={cancelModelHandler} />
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
        </>
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
