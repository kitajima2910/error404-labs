import { StyleSheet, Text, View, SafeAreaView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Title from '../components/ui/Title'
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import Card from '../components/ui/Card'
import Colors from '../constants/colors'

const generateRandomBetween = (min, max, exclude) => {
    const rndNum = ~~(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userNumber, onGameOver }) => {

    const initialGuess = generateRandomBetween(1, 100, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);

    useEffect(() => {
        minBoundary = 1;
        maxBoundary = 100;

        if (currentGuess === userNumber) {
            onGameOver();
        }
    }, [ currentGuess, userNumber, onGameOver ]);

    const nextGuessHandler = (direction) => {
        if (
            (direction === "lower" && currentGuess < userNumber) ||
            (direction === "greater" && currentGuess > userNumber)
        ) {
            Alert.alert("Don't lie!", "You know that this is wrong...", [
                { text: "Sorry!", style: "cancel" },
            ]);
            return;
        }

        if (direction === "lower") {
            maxBoundary = currentGuess;
        } else {
            minBoundary = currentGuess + 1;
        }

        const nextNumber = generateRandomBetween(
            minBoundary,
            maxBoundary,
            currentGuess
        );
        setCurrentGuess(nextNumber);
    };


    return (
        <View style={styles.screen}>
            {/* <Text style={styles.title}>Opponent's Guess</Text> */}
            <Title>Opponent's Guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            {/* GUESS */}
            <Card>
                <Text style={{ color: Colors.accent500, fontSize: 24 }}>Higher or lower?</Text>
                {/* + - */}
                <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>-</PrimaryButton>
                <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>+</PrimaryButton>
            </Card>
            {/* <View>
                <Text>LOG ROUNDS</Text>
            </View> */}
        </View>
    )
}

export default React.memo(GameScreen); //GameScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 16,
        marginTop: 30
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
})