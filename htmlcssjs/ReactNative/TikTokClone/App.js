import "./global.css";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/tabs/HomeScreen";
import FriendsScreen from "./screens/tabs/FriendsScreen";
import CameraScreen from "./screens/tabs/CameraScreen";
import InboxScreen from "./screens/tabs/InboxScreen";
import ProfileScreen from "./screens/tabs/ProfileScreen";
import LoginScreen from "./screens/LoginScreen";

import Ionicons from "@expo/vector-icons/Ionicons";

import { View } from "react-native";

const Stack = createNativeStackNavigator();
const BootomTabs = createBottomTabNavigator();

const TabsBootomTabs = () => {
    return (
        <BootomTabs.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor: "black",
                tabBarInactiveTintColor: "gray",
                headerShown: false,
            }}
        >
            <BootomTabs.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => <Ionicons name={focused ? "home-sharp" : "home-outline"} size={24} color="black" />,
                }}
            />
            <BootomTabs.Screen
                name="Friends"
                component={FriendsScreen}
                options={{
                    tabBarIcon: ({ focused }) => <Ionicons name={focused ? "people-sharp" : "people-outline"} size={24} color="black" />,
                }}
            />
            <BootomTabs.Screen
                name="Camera"
                component={CameraScreen}
                options={{
                    title: "",
                    tabBarIcon: () => (
                        <View className="absolute bottom-[-1/2] w-20 h-20 rounded-full justify-center items-center">
                            <Ionicons name="add-circle-sharp" size={70} color="black" />
                        </View>
                    ),
                }}
            />
            <BootomTabs.Screen
                name="Inbox"
                component={InboxScreen}
                options={{
                    tabBarIcon: ({ focused }) => <Ionicons name={focused ? "chatbubbles-sharp" : "chatbubbles-outline"} size={24} color="black" />,
                }}
            />
            <BootomTabs.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) => <Ionicons name={focused ? "person-sharp" : "person-outline"} size={24} color="black" />,
                }}
            />
        </BootomTabs.Navigator>
    );
};

const LoginStack = () => {
    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Tabs" component={TabsBootomTabs} />
        </Stack.Navigator>
    );
};

export default function App() {
    return (
        <NavigationContainer>
            <LoginStack />
        </NavigationContainer>
    );
}
