import { Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from "@react-navigation/native" 
import React from 'react'

const CategoryGridTile = ({ title, color, onPress }) => {

    const navigation = useNavigation()

    return (
        <View style={styles.gridItems}>
            <Pressable onPress={onPress} android_ripple={{ color: "#ccc" }} style={({pressed}) => [styles.button, pressed ? styles.buttonPressed : null]}>
                <View style={[styles.innerContainer, { backgroundColor: color }]}>
                    <Text style={styles.title}>{title}</Text>
                </View>
            </Pressable>
        </View>
    )
}

export default CategoryGridTile

const styles = StyleSheet.create({
    gridItems: {
        flex: 1,
        margin: 16,
        height: 150,
        borderRadius: 8,
        elevation: 4,
        backgroundColor: "white",
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        shadowOpacity: 0.25,
        overflow: Platform.OS === "android" ? "hidden" : "visible"
    },
    innerContainer: {
        flex: 1,
        padding: 16,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8
    },
    button: {
        flex: 1
    },
    buttonPressed: {
        opacity: 0.5        
    },
    title: {
        fontWeight: "bold",
        fontSize: 18
    }
})