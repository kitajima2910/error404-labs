import React from "react";
import { StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
    children: React.ReactNode;
};

const Container = (props: Props) => {
    return (
        <LinearGradient
            colors={["rgba(253, 240, 243, 1)", "rgba(255, 251, 252, 1)"]}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={{ flex: 1 }}>{props.children}</SafeAreaView>
        </LinearGradient>
    );
};

export default Container;

const styles = StyleSheet.create({});
