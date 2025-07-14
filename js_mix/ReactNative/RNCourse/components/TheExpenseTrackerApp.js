import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ManageExpenses from "../screens/ManageExpenses";
import AllExpenses from "../screens/AllExpenses";
import RecentExpenses from "../screens/RecentExpenses";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const ExpensesOverview = () => {
    return (
        <BottomTabs.Navigator>
            <BottomTabs.Screen name="AllExpenses" component={AllExpenses} />
            <BottomTabs.Screen name="RecentExpenses" component={RecentExpenses} />
        </BottomTabs.Navigator>
    );
};

const TheExpenseTrackerApp = () => {
    return (
        <>
            <StatusBar style="light" />
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="ExpensesOverview" component={ExpensesOverview} />
                    <Stack.Screen name="ManageExpenses" component={ManageExpenses} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
};

export default TheExpenseTrackerApp;

const styles = StyleSheet.create({});
