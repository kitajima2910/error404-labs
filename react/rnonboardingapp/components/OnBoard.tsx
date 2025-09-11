import Colors from "@/assets/colors/palette";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { ms, mvs } from "react-native-size-matters";

const data = [
    {
        title: "Save time by tracking your studies",
        text: "Schedule your classes, assignments, quizzes and more",
        image: require("@/assets/images/Onboard_UI/Group_1.png"),
        bg: "#59b2ab",
    },
    {
        title: "Stay on top of your education",
        text: "Reduce your stress, increase your productivity",
        image: require("@/assets/images/Onboard_UI/Group_2.png"),
        bg: "#febe29",
    },
    {
        title: "Spend more time doing the things you love",
        text: "Get started within five minutes",
        image: require("@/assets/images/Onboard_UI/Group_3.png"),
        bg: "#22bcb5",
    },
];

type Item = (typeof data)[0];

const OnBoard = () => {
    const _renderItem = ({ item }: { item: Item }) => {
        return (
            <View style={styles.container}>
                <Image style={styles.image} source={item.image} />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.text}>{item.text}</Text>
            </View>
        );
    };

    const _keyExtractor = (item: Item) => item.title;

    const renderDoneButton = () => {
        return (
            <View style={styles.rightWrapperText}>
                <Text style={styles.rightText}>Done</Text>
            </View>
        );
    };

    const renderNextButton = () => {
        return (
            <View style={styles.rightWrapperText}>
                <Text style={styles.rightText}>Next</Text>
            </View>
        );
    };

    const renderPrevButton = () => {
        return (
            <View style={styles.leftWrapperText}>
                <Text style={styles.leftText}>Prev</Text>
            </View>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <AppIntroSlider
                keyExtractor={_keyExtractor}
                renderItem={_renderItem}
                renderDoneButton={renderDoneButton}
                renderNextButton={renderNextButton}
                renderPrevButton={renderPrevButton}
                showPrevButton
                dotStyle={styles.dotStyle}
                activeDotStyle={styles.activeDotStyle}
                data={data}
            />
        </View>
    );
};

export default OnBoard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        marginBottom: mvs(22),
    },
    title: {
        fontFamily: "OpenSans-Bold",
        fontSize: ms(24),
        fontWeight: "700",
        color: Colors.black,
        textAlign: "center",
        marginHorizontal: ms(57),
        marginBottom: mvs(21),
    },
    text: {
        fontFamily: "OpenSans-Regular",
        fontWeight: "600",
        fontSize: ms(14),
        color: Colors.gray,
        textAlign: "center",
        marginHorizontal: ms(45),
    },
    rightWrapperText: {
        position: "absolute",
        top: mvs(-20),
        left: mvs(-50),
    },
    rightText: {
        fontFamily: "OpenSans-Regular",
        fontWeight: "600",
        fontSize: ms(14),
        color: Colors.blue,
    },
    leftWrapperText: {
        // backgroundColor: "pink",
        position: "absolute",
        top: mvs(-20),
        left: mvs(30),
    },
    leftText: {
        fontFamily: "OpenSans-Regular",
        fontWeight: "600",
        fontSize: ms(14),
        color: Colors.black,
    },
    dotStyle: {
        width: ms(10),
        height: ms(10),
        borderRadius: ms(4),
        backgroundColor: Colors.gray,
        marginBottom: mvs(60),
    },
    activeDotStyle: {
        width: ms(10),
        height: ms(10),
        borderRadius: ms(4),
        backgroundColor: Colors.blue,
        marginBottom: mvs(60),
    },
});
