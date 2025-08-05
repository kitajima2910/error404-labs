import {
    FlatList,
    Image,
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
import { useState } from "react";
import { Checkbox } from "react-native-paper";

const data = TODO_DATA;

export default function App() {
    const [valueFilterTask, setValueFilterTask] = useState("");

    const handleButtonClose = () => {
        setValueFilterTask("");
    };

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
                            height: ms(40),
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
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.containerItem}>
                        <View style={styles.containerItemLeft}>
                            <Checkbox
                                status={item.isDone ? "checked" : "unchecked"}
                                color="blue"
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
                            onPress={() => {
                                alert("Deleted " + item.id);
                            }}
                        >
                            <Ionicons name="trash" size={24} color="red" />
                        </TouchableOpacity>
                    </View>
                )}
                style={{ width: "100%" }}
            />

            <View style={styles.containerAddNew}>
                <TextInput
                    style={{
                        flex: 1,
                        backgroundColor: "#F2F2F2",
                        marginEnd: ms(10),
                        borderRadius: ms(10),
                        paddingHorizontal: ms(20),
                        paddingTop: ms(10),
                        paddingBottom: ms(10),
                        marginBottom: ms(20),
                        fontSize: ms(16),
                    }}
                    placeholder="Add new task"
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
                        marginBottom: ms(20),
                    }}
                    onPress={() => {}}
                >
                    <Ionicons name="add" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        // alignItems: "center",
        // justifyContent: "center",
        paddingTop: StatusBar.length + ms(20),
        paddingHorizontal: ms(20),
    },
    containerHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginBottom: ms(20),
    },
    containerSearch: {
        width: "100%",
        backgroundColor: "#F2F2F2",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: ms(20),
        paddingVertical: ms(10),
        borderRadius: ms(10),
        marginBottom: ms(20),
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
        marginBottom: ms(10),
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
