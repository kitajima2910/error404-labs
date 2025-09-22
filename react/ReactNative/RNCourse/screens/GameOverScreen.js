import { Dimensions, Image, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import React from "react";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";
import PrimaryButton from "../components/ui/PrimaryButton";

const GameOverScreen = ({ roundsNumber, userNumber, onRestart }) => {
    const { height, width } = useWindowDimensions();

    let imageSize = 300;

    if (width < 380) {
        imageSize = 150;
    }

    if (height < 400) {
        imageSize = 80;
    }

    const imageStyle = {
        width: imageSize,
        height: imageSize,
        borderRadius: imageSize / 2,
    };

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24 }}>
                <Title>Game Over</Title>
                <View style={[styles.imageContainer, imageStyle]}>
                    <Image style={styles.image} source={require("../assets/images/success.png")} />
                </View>
                <Text style={{ fontSize: 20, fontFamily: "open-sans-bold", textAlign: "center", marginVertical: 24 }}>
                    Your phone needed <Text style={{ color: Colors.accent500 }}>{roundsNumber}</Text> rounds to guess the number <Text style={{ color: Colors.accent500 }}>{userNumber}</Text>
                </Text>
                <PrimaryButton onPress={onRestart}>Start New Game</PrimaryButton>
            </View>
        </ScrollView>
    );
};

export default GameOverScreen;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    imageContainer: {
        // width: deviceWidth < 380 ? 150 : 300,
        // height: deviceWidth < 380 ? 150 : 300,
        // borderRadius: deviceWidth < 380 ? 75 : 150,
        borderWidth: 3,
        borderColor: Colors.primary800,
        margin: 36,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
    },
});
