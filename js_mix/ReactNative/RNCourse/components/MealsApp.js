import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import CategoriesScreen from "../screens/CategoriesScreen";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MealsOverviewScreen from "../screens/MealsOverviewScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import FavoritesScreen from "../screens/FavoritesScreen";
import { Ionicons } from "@expo/vector-icons";
import FavoritesContextProvider from "../store/context/favorites-context";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <>
            <Drawer.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: "#351401",
                    },
                    headerTintColor: "white",
                    sceneStyle: {
                        backgroundColor: "#3f2f25",
                    },
                    drawerContentStyle: {
                        backgroundColor: "#351401",
                    },
                    drawerInactiveTintColor: "white",
                    drawerActiveTintColor: "#351401",
                    drawerActiveBackgroundColor: "#e4baa1",
                }}
            >
                <Drawer.Screen
                    name="Categories"
                    component={CategoriesScreen}
                    options={{
                        title: "All Categories",
                        drawerIcon: ({ color, size }) => {
                            return <Ionicons name="list" size={size} color={color} />;
                        },
                    }}
                />
                <Drawer.Screen
                    name="Favorites"
                    component={FavoritesScreen}
                    options={{
                        drawerIcon: ({ color, size }) => {
                            return <Ionicons name="star" size={size} color={color} />;
                        },
                    }}
                />
            </Drawer.Navigator>
        </>
    );
};

const MealsApp = () => {
    return (
        <>
            <StatusBar style="light" />

            <FavoritesContextProvider>
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
                            name="Drawer"
                            component={DrawerNavigator}
                            options={{
                                title: "All Categories",
                                headerShown: false,
                            }}
                        />
                        <Stack.Screen name="MealsOverview" component={MealsOverviewScreen} />
                        <Stack.Screen name="MealDetail" component={MealDetailScreen} options={{ title: "About the Meal" }} />
                    </Stack.Navigator>
                </NavigationContainer>
            </FavoritesContextProvider>
        </>
    );
};

export default MealsApp;

const styles = StyleSheet.create({});
