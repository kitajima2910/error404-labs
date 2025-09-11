import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ms, mvs } from "react-native-size-matters";

type Props = {
    sizeName: string;
    sizeNumber: number;
    crust: string;
    deliveryTime: number;
    image: any;
};

const Info = (props: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <View style={styles.leftInfo}>
                    <Text style={styles.leftInfoSmall}>Size</Text>
                    <Text style={styles.leftInfoBig}>
                        {props.sizeName} {props.sizeNumber}”
                    </Text>
                </View>
                <View style={styles.leftInfo}>
                    <Text style={styles.leftInfoSmall}>Crust</Text>
                    <Text style={styles.leftInfoBig}>{props.crust}</Text>
                </View>
                <View style={styles.leftInfo}>
                    <Text style={styles.leftInfoSmall}>Delivery in</Text>
                    <Text style={styles.leftInfoBig}>
                        {props.deliveryTime} min
                    </Text>
                </View>
            </View>
            <View style={styles.right}>
                <Image source={props.image} />
            </View>
        </View>
    );
};

export default Info;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: ms(20),
        marginBottom: mvs(30),
    },
    left: {
        gap: ms(20),
        marginRight: ms(50),
    },
    right: {},
    leftInfo: {},
    leftInfoSmall: {
        fontFamily: "Montserrat-Regular",
        fontWeight: "500",
        fontSize: ms(14),
        color: "#C4C4C4",
    },
    leftInfoBig: {
        fontFamily: "Montserrat-Bold",
        fontWeight: "600",
        fontSize: ms(16),
        color: "#000",
    },
});
