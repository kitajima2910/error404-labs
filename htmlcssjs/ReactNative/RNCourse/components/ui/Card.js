import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../constants/colors'

const Card = ({ children }) => {
    return (
        <View style={styles.inputContainer}>
            {children}
        </View>
    )
}

export default Card

const deviceWidth = Dimensions.get("window").width

const styles = StyleSheet.create({

    inputContainer: {
        // marginTop: 100,
        marginHorizontal: 24,
        padding: 16,
        backgroundColor: Colors.primary800,
        borderRadius: 8,
        elevation: 4,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
        justifyContent: 'center',
        alignItems: 'center'
    },

})