import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { s, vs } from "react-native-size-matters";
import { CashIcon, CheckMarkIcon } from "../assets/icons";

type Props = {
    isSelected?: boolean;
    label: string;
    icon: React.ReactNode;
    onPress?: () => void;
};

const PayMethodCard = (props: Props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={props.onPress}>
                <View style={[styles.icon, props.isSelected && styles.iconSelected]}>
                    {props.icon}
                </View>
                {props.isSelected && (
                    <View style={styles.iconCheckMark}>
                        <CheckMarkIcon />
                    </View>
                )}
                <Text style={styles.text}>{props.label}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default PayMethodCard;

const styles = StyleSheet.create({
    container: {
        // width: s(85),
        // height: vs(93),
        position: "relative",
        // paddingTop: vs(8),
    },
    icon: {
        // width: "100%",
        width: s(85),
        height: vs(72),
        backgroundColor: "#F0F5FA",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: s(12),
    },
    iconSelected: {
        borderWidth: 2,
        borderColor: "#FF7622",
    },
    iconCheckMark: {
        width: s(24),
        height: s(24),
        backgroundColor: "#FF7622",
        position: "absolute",
        borderWidth: s(2),
        borderColor: "#fff",
        borderRadius: s(12),
        top: vs(-5),
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        textAlign: "center",
        marginTop: vs(4),
        fontSize: s(14),
        fontWeight: "400",
        fontFamily: "Montserrat-SemiBold",
        color: "#464E57",
    },
});
