import {
    FlatList,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { TODO_DATA } from "./data/fake";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";
import { ms, mvs, s } from "react-native-size-matters";
import { useEffect, useState } from "react";
import { Checkbox } from "react-native-paper";
import { Todo } from "./models/Todo";
import AsyncStorage from "@react-native-async-storage/async-storage";

const data = TODO_DATA;

export default function App() {
    const [dataTodo, setDataTodo] = useState<Todo[]>([]);
    const [dataTodoOld, setDataTodoOld] = useState<Todo[]>([]);
    const [valueFilterTask, setValueFilterTask] = useState("");
    const [valueAddNewTask, setValueAddNewTask] = useState("");

    useEffect(() => {
        const getData = async () => {
            try {
                const value = await AsyncStorage.getItem("TODO_DATA");
                if (value !== null) {
                    setDataTodo(JSON.parse(value));
                    setDataTodoOld(JSON.parse(value));
                }
            } catch (error) {
                console.log(error);
            }
        };

        getData();
    }, []);

    const handleButtonClose = () => {
        setValueFilterTask("");
    };

    const handleButtonAddNew = async () => {
        if (valueAddNewTask !== "") {
            try {
                setDataTodo([
                    {
                        id: Math.random(),
                        title: valueAddNewTask,
                        isDone: false,
                    },
                    ...dataTodo,
                ]);
                setDataTodoOld(dataTodo);
                await AsyncStorage.setItem(
                    "TODO_DATA",
                    JSON.stringify(dataTodo)
                );

                setValueAddNewTask("");
                Keyboard.dismiss();
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleButtonRemove = async (id: number, title: string) => {
        try {
            alert("Removed: " + title);
            setDataTodo(dataTodo.filter((item) => item.id !== id));
            setDataTodoOld(dataTodo.filter((item) => item.id !== id));
            await AsyncStorage.setItem("TODO_DATA", JSON.stringify(dataTodo));
        } catch (error) {
            console.log(error);
        }
    };

    const handleCheckBox = async (id: number) => {
        try {
            const newData = dataTodo.map((item) => {
                if (item.id === id) {
                    item.isDone = !item.isDone;
                }
                return item;
            });
            setDataTodo(newData);
            await AsyncStorage.setItem("TODO_DATA", JSON.stringify(newData));
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearchAuto = () => {
        if (valueFilterTask === "") {
            setDataTodo(dataTodoOld);
        } else {
            const newData = dataTodo.filter((item) =>
                item.title.toLowerCase().includes(valueFilterTask.toLowerCase())
            );
            setDataTodo(newData);
        }
    };

    useEffect(() => {
        handleSearchAuto();
    }, [valueFilterTask]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.containerHeader}>
                <TouchableOpacity
                    onPress={() => {
                        alert("Clicked");
                    }}
                >
                    <Ionicons name="menu" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}}>
                    <Image
                        source={{
                            uri: "https://avatars.githubusercontent.com/u/50172777?v=4",
                            width: ms(40),
                            height: mvs(40),
                        }}
                        style={{ borderRadius: ms(20) }}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.containerSearch}>
                <Ionicons name="search" size={24} color="black" />
                <TextInput
                    placeholder="Search"
                    style={{
                        marginStart: ms(10),
                        width: ms(250),
                        height: "100%",
                    }}
                    value={valueFilterTask}
                    onChangeText={setValueFilterTask}
                />
                <TouchableOpacity
                    onPress={handleButtonClose}
                    style={styles.containerSearchClose}
                >
                    <Ionicons name="close-circle" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={dataTodo}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.containerItem}>
                        <View style={styles.containerItemLeft}>
                            <Checkbox
                                status={item.isDone ? "checked" : "unchecked"}
                                color="blue"
                                onPress={() => handleCheckBox(item.id)}
                            />
                            <Text
                                style={[
                                    styles.containerItemLeftText,
                                    {
                                        textDecorationLine: item.isDone
                                            ? "line-through"
                                            : "none",
                                    },
                                ]}
                            >
                                {item.title}
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() =>
                                handleButtonRemove(item.id, item.title)
                            }
                        >
                            <Ionicons name="trash" size={24} color="red" />
                        </TouchableOpacity>
                    </View>
                )}
                style={{ width: "100%" }}
            />

            <KeyboardAvoidingView
                behavior="padding"
                keyboardVerticalOffset={10}
                style={styles.containerAddNew}
            >
                <TextInput
                    style={{
                        flex: 1,
                        backgroundColor: "#F2F2F2",
                        marginEnd: ms(10),
                        borderRadius: ms(10),
                        paddingHorizontal: ms(20),
                        paddingTop: mvs(10),
                        paddingBottom: mvs(10),
                        marginBottom: mvs(20),
                        fontSize: ms(16),
                    }}
                    placeholder="Add new task"
                    value={valueAddNewTask}
                    onChangeText={setValueAddNewTask}
                />
                <TouchableOpacity
                    style={{
                        marginEnd: ms(10),
                        backgroundColor: "green",
                        padding: ms(10),
                        borderRadius: ms(10),
                        alignItems: "center",
                        justifyContent: "center",
                        width: ms(42),
                        height: ms(42),
                        marginBottom: mvs(20),
                    }}
                    onPress={handleButtonAddNew}
                >
                    <Ionicons name="add" size={24} color="black" />
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        // alignItems: "center",
        // justifyContent: "center",
        paddingTop: StatusBar.length + mvs(20),
        paddingHorizontal: ms(20),
    },
    containerHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginBottom: mvs(20),
    },
    containerSearch: {
        width: "100%",
        backgroundColor: "#F2F2F2",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: ms(20),
        paddingVertical: mvs(10),
        borderRadius: ms(10),
        marginBottom: mvs(20),
        position: "relative",
    },
    containerSearchClose: {
        position: "absolute",
        right: ms(10),
    },
    containerItem: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: mvs(10),
        borderRadius: ms(10),
    },
    containerItemLeft: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    containerItemLeftText: {
        fontSize: ms(16),
        marginStart: ms(5),
    },
    containerAddNew: {
        // backgroundColor: "#F2F2F2",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
});
