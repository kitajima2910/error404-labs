import CategoryScreen from "@/app/CategoryScreen";
import HomeScreen from "@/app/HomeScreen";
import { createDrawerNavigator, DrawerContent } from "@react-navigation/drawer";
import React from "react";
import { StyleSheet } from "react-native";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
    return (
        <Drawer.Navigator
            initialRouteName="home"
            drawerContent={(props) => <DrawerContent {...props} />}
            screenOptions={{
                headerShown: true,
                drawerStyle: {
                    backgroundColor: "#fff",
                },
                drawerActiveTintColor: "#e91e63",
                drawerInactiveTintColor: "#000",
                drawerActiveBackgroundColor: "#fff",
                drawerInactiveBackgroundColor: "#fff",
                drawerLabelStyle: {
                    fontWeight: "bold",
                },
                drawerItemStyle: {
                    backgroundColor: "#fff",
                },
            }}
        >
            <Drawer.Screen
                name="home"
                component={HomeScreen}
                options={{
                    drawerLabel: "Home",
                    title: "Home",
                }}
            />
            <Drawer.Screen
                name="business"
                component={CategoryScreen}
                initialParams={{ category: "business" }}
                options={{
                    drawerLabel: "Business",
                    title: "Business",
                }}
            />
            <Drawer.Screen
                name="entertainment"
                component={CategoryScreen}
                initialParams={{ category: "entertainment" }}
                options={{
                    drawerLabel: "Entertainment",
                    title: "Entertainment",
                }}
            />
            <Drawer.Screen
                name="health"
                component={CategoryScreen}
                initialParams={{ category: "health" }}
                options={{
                    drawerLabel: "Health",
                    title: "Health",
                }}
            />
            <Drawer.Screen
                name="science"
                component={CategoryScreen}
                initialParams={{ category: "science" }}
                options={{
                    drawerLabel: "Science",
                    title: "Science",
                }}
            />
            <Drawer.Screen
                name="sports"
                component={CategoryScreen}
                initialParams={{ category: "sports" }}
                options={{
                    drawerLabel: "Sports",
                    title: "Sports",
                }}
            />
            <Drawer.Screen
                name="technology"
                component={CategoryScreen}
                initialParams={{ category: "technology" }}
                options={{
                    drawerLabel: "Technology",
                    title: "Technology",
                }}
            />
        </Drawer.Navigator>
    );
};

export default DrawerNavigation;

const styles = StyleSheet.create({});
