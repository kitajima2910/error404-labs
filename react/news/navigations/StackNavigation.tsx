import SplashScreen from "@/app/SplashScreen";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet } from "react-native";
import DrawerNavigation from "./DrawerNavigation";

const Stack = createStackNavigator();

const StackNavigation = () => {
    return (
        <Stack.Navigator
            initialRouteName="splash"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="splash" component={SplashScreen} />
            {/* <Stack.Screen name="home" component={HomeScreen} /> */}
            <Stack.Screen name="drawer" component={DrawerNavigation} />
        </Stack.Navigator>
    );
};

export default StackNavigation;

const styles = StyleSheet.create({});
