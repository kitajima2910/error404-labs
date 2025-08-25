import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet } from "react-native";

import Cart from "@/app/_cart";
import Profile from "@/app/_profile";
import ReOrder from "@/app/_re_order";

import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { mvs } from "react-native-size-matters";
import StackTabs from "./StackTabs";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: "rgba(233, 110, 110, 1)",
                tabBarStyle: {
                    minHeight: mvs(104),
                    paddingTop: mvs(30),
                },
            }}
        >
            <Tab.Screen
                name="StackTabs"
                component={StackTabs}
                options={({ route }) => {
                    const routeName =
                        getFocusedRouteNameFromRoute(route) ?? "Home"; // mặc định là Home

                    return {
                        tabBarIcon: ({ color, size }) => (
                            <Entypo
                                name="home"
                                size={size}
                                // Nếu không ở Home thì cho màu inactive (xám)
                                color={routeName === "Home" ? color : "gray"}
                            />
                        ),
                    };
                }}
                listeners={({ navigation }) => ({
                    tabPress: (e) => {
                        const isFocused = navigation.isFocused();

                        if (isFocused) {
                            // Reset stack về Home trong StackTabs
                            navigation.navigate("StackTabs", {
                                screen: "Home",
                            });
                        }
                    },
                })}
            />
            {/* <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="home" size={size} color={color} />
                    ),
                }}
            /> */}
            <Tab.Screen
                name="ReOrder"
                component={ReOrder}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="reorder-horizontal"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Cart"
                component={Cart}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons
                            name="shopping-cart"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="account"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomTabs;

const styles = StyleSheet.create({});
