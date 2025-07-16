import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../constants/styles'
import Button from './Button'

const ErrorOverlay = ({message}) => {
    return (
        <View style={styles.container}>
            <Text style={[styles.title, styles.text]}>An error occurred!</Text>
            <Text style={styles.text}>{message}</Text>
        </View>
    )
}

export default ErrorOverlay

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700
    },
    text: {
        color: 'white',
        textAlign: 'center',
        marginBottom: 8
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 8
    }
})