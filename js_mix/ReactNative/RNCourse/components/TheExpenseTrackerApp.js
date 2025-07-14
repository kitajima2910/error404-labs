import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ManageExpenses from "../screens/ManageExpenses";
import AllExpenses from "../screens/AllExpenses";
import RecentExpenses from "../screens/RecentExpenses";
import { GlobalStyles } from "../constants/styles";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "./ui/IconButton";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const ExpensesOverview = () => {
    const navigation = useNavigation();

    return (
        <BottomTabs.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
                headerTintColor: "white",
                tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
                tabBarActiveTintColor: GlobalStyles.colors.accent500,
                headerRight: ({ tintColor }) => <IconButton icon="add" size={24} color={tintColor} onPress={() => navigation.navigate("ManageExpenses")} />,
            }}
        >
            <BottomTabs.Screen
                name="RecentExpenses"
                component={RecentExpenses}
                options={{
                    title: "Recent Expenses",
                    tabBarLabel: "Recent",
                    tabBarIcon: ({ color, size }) => {
                        return <Ionicons name="hourglass" size={size} color={color} />;
                    },
                }}
            />
            <BottomTabs.Screen
                name="AllExpenses"
                component={AllExpenses}
                options={{
                    title: "All Expenses",
                    tabBarLabel: "All Expenses",
                    tabBarIcon: ({ color, size }) => {
                        return <Ionicons name="calendar" size={size} color={color} />;
                    },
                }}
            />
        </BottomTabs.Navigator>
    );
};

const TheExpenseTrackerApp = () => {
    return (
        <>
            <StatusBar style="light" />
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: GlobalStyles.colors.primary500,
                        },
                        headerTintColor: "white",
                    }}
                >
                    <Stack.Screen
                        name="ExpensesOverview"
                        component={ExpensesOverview}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen name="ManageExpenses" component={ManageExpenses} options={{ title: "Manage Expenses", presentation: "modal" }} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
};

export default TheExpenseTrackerApp;

const styles = StyleSheet.create({});
