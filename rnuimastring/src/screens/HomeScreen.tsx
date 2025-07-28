import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { s, vs } from "react-native-size-matters";
import TopTabs from "../components/TopTabs";

const HomeScreen = () => {
    return (
        <View style={{ paddingTop: vs(70), paddingHorizontal: vs(16) }}>
            <Text
                style={{
                    color: "#1D150F",
                    fontSize: s(20),
                    fontWeight: "semibold",
                    fontFamily: "Montserrat-SemiBold",
                    marginBottom: vs(6),
                }}
            >
                Meditations
            </Text>
            <Text
                style={{
                    color: "#2C2016",
                    fontSize: s(14),
                    fontWeight: "regular",
                    fontFamily: "Montserrat-Regular",
                    marginBottom: vs(16),
                }}
            >
                Lorem Ipsum is simply dummy text
            </Text>
            <TopTabs />
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({});
