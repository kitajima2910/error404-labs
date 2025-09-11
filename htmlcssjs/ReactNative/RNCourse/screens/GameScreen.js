import { StyleSheet, Text, View, SafeAreaView, Alert, FlatList, ScrollView, useWindowDimensions } from "react-native";
import React, { useEffect, useState } from "react";
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import Colors from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import GuessLogItems from "../components/game/GuessLogItems";

const generateRandomBetween = (min, max, exclude) => {
    const rangeSize = max - min;

    if (rangeSize <= 0) {
        return min; // fallback, tránh crash
    }

    const rndNum = Math.floor(Math.random() * rangeSize) + min;

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userNumber, onGameOver }) => {
    const initialGuess = generateRandomBetween(1, 100, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [rounds, setRounds] = useState([initialGuess]);
    const { width, height } = useWindowDimensions();

    useEffect(() => {
        console.log(currentGuess, userNumber);

        if (currentGuess === +userNumber) {
            console.log("Game Over");
            onGameOver(rounds.length);
        }
    }, [currentGuess, userNumber, onGameOver]);

    useEffect(() => {
        minBoundary = 1;
        maxBoundary = 100;
    }, []);

    const nextGuessHandler = (direction) => {
        if ((direction === "lower" && currentGuess < userNumber) || (direction === "greater" && currentGuess > userNumber)) {
            Alert.alert("Don't lie!", "You know that this is wrong...", [{ text: "Sorry!", style: "cancel" }]);
            return;
        }

        if (direction === "lower") {
            maxBoundary = currentGuess;
        } else {
            minBoundary = currentGuess + 1;
        }

        const nextNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
        setCurrentGuess(nextNumber);
        setRounds((curRounds) => [nextNumber, ...curRounds]);
    };

    let content = (
        <>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <View style={styles.buttonContainer}>
                    <Text style={{ color: Colors.accent500, fontSize: 24 }}>Higher or lower?</Text>
                    <View style={styles.buttonsContainer}>
                        <View style={{ width: "50%" }}>
                            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
                                <Ionicons name="remove" size={24} color="white" />
                            </PrimaryButton>
                        </View>
                        <View style={{ width: "50%" }}>
                            <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
                                <Ionicons name="add" size={24} color="white" />
                            </PrimaryButton>
                        </View>
                    </View>
                </View>
            </Card>
        </>
    );

    if (width > 500) {
        content = (
            <>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: -20 }}>
                    <View style={{ width: "20%" }}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
                            <Ionicons name="remove" size={24} color="white" />
                        </PrimaryButton>
                    </View>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <View style={{ width: "20%" }}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
                            <Ionicons name="add" size={24} color="white" />
                        </PrimaryButton>
                    </View>
                </View>
            </>
        );
    }

    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            <>{content}</>
            <View style={{ flex: 1, padding:  16 }}>
                <FlatList data={rounds} renderItem={(itemData) => <GuessLogItems roundNumber={rounds.length - itemData.index} guess={itemData.item} />} keyExtractor={(item) => item} />
            </View>
        </View>
    );
};

export default GameScreen; //GameScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 16,
        marginTop: 30,
        alignItems: "center",
    },
    // title: {
    //     fontSize: 24,
    //     fontWeight: "bold",
    //     color: "#ddb52f",
    //     textAlign: "center",
    //     borderWidth: 2,
    //     borderColor: "#ddb52f",
    //     padding: 12,
    // },
    buttonContainer: {
        flexDirection: "column",
        alignItems: "center",
    },
    buttonsContainer: {
        flexDirection: "row",
    },
});
