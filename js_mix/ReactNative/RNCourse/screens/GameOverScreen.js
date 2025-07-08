import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";
import PrimaryButton from "../components/ui/PrimaryButton";

const GameOverScreen = ({ roundsNumber, userNumber, onRestart }) => {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24 }}>
            <Title>Game Over</Title>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require("../assets/images/success.png")} />
            </View>
            <Text style={{ fontSize: 20, fontFamily: "open-sans-bold", textAlign: "center", marginVertical: 24 }}>
                Your phone needed <Text style={{ color: Colors.accent500 }}>{roundsNumber}</Text> rounds to guess the number <Text style={{ color: Colors.accent500 }}>{userNumber}</Text>
            </Text>
			<PrimaryButton onPress={onRestart}>Start New Game</PrimaryButton>
        </View>
    );
};

export default GameOverScreen;

const styles = StyleSheet.create({
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
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
