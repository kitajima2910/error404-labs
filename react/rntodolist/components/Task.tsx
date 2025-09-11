import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ms, mvs } from "react-native-size-matters";

type Props = {
    text: string;
    completed: boolean;
    handleCheckBox: () => void;
};

const Task = (props: Props) => {
    const handleCheckBox = () => {
        props.handleCheckBox();
    };

    return (
        <View style={styles.container}>
            <View style={styles.containerLeft}>
                <TouchableOpacity
                    style={[
                        styles.containerLeftCheckBox,
                        props.completed && { backgroundColor: "green" },
                    ]}
                    onPress={handleCheckBox}
                ></TouchableOpacity>
                <Text
                    style={[
                        styles.containerLeftText,
                        props.completed && {
                            textDecorationLine: "line-through",
                        },
                    ]}
                >
                    {props.text}
                </Text>
            </View>
            <View style={styles.containerRight}></View>
        </View>
    );
};

export default Task;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        padding: ms(15),
        borderRadius: ms(10),
        marginBottom: mvs(20),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    containerLeft: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
    },
    containerLeftCheckBox: {
        width: ms(24),
        height: mvs(24),
        backgroundColor: "#55BCF666",
        borderRadius: ms(5),
        marginRight: mvs(15),
    },
    containerLeftText: {
        fontFamily: "RobotoRegular",
        fontSize: ms(14),
        fontWeight: "400",
        maxWidth: "80%",
    },
    containerRight: {
        width: ms(12),
        height: mvs(12),
        borderWidth: 2,
        borderColor: "#55BCF6",
        borderRadius: ms(5),
    },
});
