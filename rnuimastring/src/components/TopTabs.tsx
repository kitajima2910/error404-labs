import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { s, vs } from "react-native-size-matters";

const tabsArr = ["Live", "Recorded"];
const ACTIVE_BG = "#75563B";
const ACTIVE_TEXT = "#FFFFFF";
const INACTIVE_TEXT = "#2C2016";

const TopTabs = () => {
    const [activeTab, setActiveTab] = useState("Live");

    return (
        <View style={styles.container}>
            {tabsArr.map((tabName) => {
                return (
                    <TouchableOpacity onPress={() => setActiveTab(tabName)} key={tabName} style={[styles.tabButton, activeTab === tabName && { backgroundColor: ACTIVE_BG }]}>
                        <Text style={activeTab === tabName ? styles.activeText : styles.inactiveText}>{tabName}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default TopTabs;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F5F5F4",
        borderRadius: s(12),
        height: vs(40),
        flexDirection: "row",
        alignItems: "center",
        padding: s(4),
    },
    tabButton: {
        height: vs(32),
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: s(8),
    },
    activeText: {
        color: ACTIVE_TEXT,
        fontSize: s(14),
        fontWeight: "600",
        fontFamily: "Montserrat-SemiBold",
    },
    inactiveText: {
        color: INACTIVE_TEXT,
        fontSize: s(14),
        fontWeight: "400",
        fontFamily: "Montserrat-SemiBold",
    },
});
