import React from "react";
import { StyleSheet } from "react-native";

import Home from "@/app/_home";
import ProductDetails from "@/app/_productDetails";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const StackTabs = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="ProductDetails" component={ProductDetails} />
        </Stack.Navigator>
    );
};

export default StackTabs;

const styles = StyleSheet.create({});
