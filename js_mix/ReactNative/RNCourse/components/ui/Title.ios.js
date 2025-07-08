import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../constants/colors'

const Title = ({ children }) => {
  return (
    <View>
      <Text style={styles.title}>{children}</Text>
    </View>
  )
}

export default Title

const styles = StyleSheet.create({
    title: {
        fontFamily: "open-sans-bold",
        fontSize: 24,
        // fontWeight: "bold",
        color: "white",
        textAlign: "center",
        // borderWidth: Platform.OS === "ios" ? 0 : 2,
        // borderWidth: Platform.select({ ios: 0, android: 2 }),
        borderWidth: 0,
        borderColor: "white",
        padding: 12,
        maxWidth: "80%",
        width: 300
    },
})