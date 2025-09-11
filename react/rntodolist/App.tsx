import { StatusBar } from "expo-status-bar";
import {
    FlatList,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { ms, mvs } from "react-native-size-matters";

import { useFonts } from "expo-font";
import Task from "./components/Task";
import { use, useState } from "react";

type TaskModel = {
    id: string;
    text: string;
    completed: boolean;
};

export default function App() {
    // const [loaded, error] = useFonts({
    //     RobotoRegular: require("./assets/fonts/Roboto/static/Roboto-Regular.ttf"),
    //     RobotoBold: require("./assets/fonts/Roboto/static/Roboto-Bold.ttf"),
    // });

    // if (!loaded) return null;

    const [task, setTask] = useState<string>("");
    const [taskItems, setTaskItems] = useState<TaskModel[]>([]);

    const handleAddTask = () => {
        Keyboard.dismiss();
        setTaskItems([
            { id: Math.random().toString(), text: task, completed: false },
            ...taskItems,
        ]);
        setTask("");
    };

    const handleCompleteTask = (id: string) => {
        const taskItemsNew = taskItems.filter((item) => item.id !== id);
        setTaskItems(taskItemsNew);
    };

    const handleCheckBox = (id: string) => {
        const taskItemsNew = taskItems.map((item) => {
            if (item.id === id) {
                item.completed = !item.completed;
            }
            return item;
        });
        setTaskItems(taskItemsNew);
    };

    return (
        <View style={styles.container}>
            {/* Tody's Tasks */}
            <View style={styles.containerTaskWrapper}>
                <Text style={styles.containerTaskWrapperTitle}>
                    Today's tasks
                </Text>
                <View style={styles.containerTaskWrapperItems}>
                    <FlatList
                        data={taskItems}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => handleCompleteTask(item.id)}
                            >
                                <Task
                                    text={item.text}
                                    completed={item.completed}
                                    handleCheckBox={() =>
                                        handleCheckBox(item.id)
                                    }
                                />
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingBottom: mvs(150),
                        }}
                    />
                    {/* {taskItems.map((item, index) => (
                        <Task key={index} text={item} />
                    ))} */}
                    {/* <Task
                        text={
                            "Task 1 Task 1 Task 1 Task 1 Task 1 Task 1 Task 1 Task 1 Task 1"
                        }
                    />
                    <Task text={"Task 2"} /> */}
                </View>
            </View>

            {/* Write a task */}
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.containerWriteTaskWrapper}
            >
                <TextInput
                    style={styles.containerWriteTaskWrapperInput}
                    placeholder={"Write a task"}
                    value={task}
                    onChangeText={setTask}
                />
                <TouchableOpacity
                    style={styles.containerWriteTaskWrapperButtonIconAdd}
                    onPress={handleAddTask}
                >
                    <Text style={styles.containerWriteTaskWrapperIconAdd}>
                        +
                    </Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E8EAED",
    },
    containerTaskWrapper: {
        paddingTop: mvs(94),
        paddingHorizontal: mvs(20),
    },
    containerTaskWrapperTitle: {
        fontSize: ms(24),
        // fontWeight: "700",/
        fontFamily: "RobotoBold",
        marginBottom: mvs(30),
    },
    containerTaskWrapperItems: {},
    containerWriteTaskWrapper: {
        position: "absolute",
        bottom: mvs(29),
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: mvs(29),
    },
    containerWriteTaskWrapperInput: {
        backgroundColor: "#fff",
        width: ms(246),
        height: mvs(45),
        borderRadius: ms(60),
        boxShadow: "0px 4px 30px 0px #00000026",
        paddingHorizontal: mvs(15),
    },
    containerWriteTaskWrapperButtonIconAdd: {
        width: ms(60),
        height: mvs(60),
        backgroundColor: "#FFFFFF",
        borderRadius: ms(52),
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0px 4px 30px 0px #00000026",
    },
    containerWriteTaskWrapperIconAdd: {
        fontSize: ms(40),
        fontFamily: "RobotoRegular",
        color: "#C0C0C0",
    },
});
