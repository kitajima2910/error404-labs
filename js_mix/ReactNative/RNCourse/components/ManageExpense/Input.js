import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../constants/styles'

const Input = ({ label, style, textInputConfig, invalid }) => {

    const inputStyles = [styles.input];

    if (textInputConfig && textInputConfig.multiline) {
        inputStyles.push(styles.inputMultiline);
    }

    // console.log("pxh invalid: ", invalid);

    return (
        <View style={[styles.inputContainer, style]}>
            <Text style={[styles.label, {  color: invalid ? GlobalStyles.colors.error500 : GlobalStyles.colors.primary100}]}>{label}</Text>
            <TextInput style={[inputStyles, { backgroundColor: invalid ? GlobalStyles.colors.error50 : GlobalStyles.colors.primary100 }]} {...textInputConfig} />
        </View>
    )
}

export default Input

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8,
        flex: 1
    },
    label: {
        fontSize: 12,
        color: GlobalStyles.colors.primary100,
        marginBottom: 4
    },
    input: {
        backgroundColor: GlobalStyles.colors.primary100,
        padding: 6,
        borderRadius: 6,
        fontSize: 16,
        color: GlobalStyles.colors.primary700
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: "top"
    }
})