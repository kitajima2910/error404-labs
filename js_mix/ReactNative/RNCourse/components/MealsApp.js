import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CategoriesScreen from "../screens/CategoriesScreen";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MealsOverviewScreen from "../screens/MealsOverviewScreen";

const Stack = createNativeStackNavigator();

const MealsApp = () => {
    return (
        <>
            <StatusBar style="dark" />
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: "#351401",
                        },
                        headerTintColor: "white",
                        contentStyle: {
                            backgroundColor: "#3f2f25",
                        },
                    }}
                >
                    <Stack.Screen
                        name="MealsCategories"
                        component={CategoriesScreen}
                        options={{
                            title: "All Categories",
                        }}
                    />
                    <Stack.Screen name="MealsOverview" component={MealsOverviewScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
};

export default MealsApp;

const styles = StyleSheet.create({});
