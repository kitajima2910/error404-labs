import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import StartGameScreen from '../screens/StartGameScreen'
import GameScreen from '../screens/GameScreen'
import GameOverScreen from '../screens/GameOverScreen'

const MiniGameApp = () => {

    const [userNumber, setUserNumber] = useState()
    const [gameIsOver, setGameIsOver] = useState(true)

    const pickedNumberHandler = useCallback((pickedNumber) => {
        setUserNumber(pickedNumber)
        setGameIsOver(false)
    }, [userNumber])

    const gameOverHandler = useCallback((gameOver) => {
        setGameIsOver(true)
    }, [gameIsOver])

    let currentScreen = <StartGameScreen onPickNumber={pickedNumberHandler} />

    if (userNumber) {
        currentScreen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    }

    if (gameIsOver && userNumber) {
        currentScreen = <GameOverScreen />
    }

    

    return (
        <>
            {/* <ImageBackground imageStyle={styles.ImageBackgroundStyle} source={require("../assets/images/background.png")} resizeMode="cover" style={styles.rootScreen}> */}
            {/* <StartGameScreen /> */}
            {currentScreen}
            {/* </ImageBackground> */}

        </>
    )
}

export default MiniGameApp

const styles = StyleSheet.create({
    rootScreen: {
        flex: 1,
        backgroundColor: "#ddb52f",
    },
    ImageBackgroundStyle: {
        opacity: 0.15
    }
})