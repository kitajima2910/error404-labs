import { MenuIcon } from "@/utils/Icon";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { ms, mvs } from "react-native-size-matters";

const Header = () => {
    return (
        <View style={styles.container}>
            <View style={styles.wrapperIcon}>
                <TouchableOpacity>
                    <MenuIcon style={styles.icon} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity>
                <Image
                    source={require("@/assets/images/midcodekid.jpg")}
                    style={styles.image}
                />
            </TouchableOpacity>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: ms(30),
        marginBottom: mvs(30),
    },
    wrapperIcon: {
        width: ms(44),
        height: mvs(44),
        borderRadius: ms(22),
        backgroundColor: "rgba(255, 255, 255, 1)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {
        width: ms(19),
        height: mvs(19),
    },
    image: {
        width: ms(44),
        height: mvs(44),
        borderRadius: ms(22),
    },
});
