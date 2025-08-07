import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { ms, mvs } from "react-native-size-matters";

const Header = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Image
                    style={styles.image}
                    source={require("../../assets/images/profile.png")}
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <Ionicons name="menu" size={ms(24)} color="black" />
            </TouchableOpacity>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: ms(20),
        marginBottom: mvs(30),
    },
    image: {
        width: ms(40),
        height: mvs(40),
        borderRadius: ms(20),
    },
});
