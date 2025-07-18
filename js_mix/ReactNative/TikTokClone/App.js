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

const Stack = createNativeStackNavigator();
const BootomTabs = createBottomTabNavigator();

const TabsBootomTabs = () => {
    return (
        <BootomTabs.Navigator initialRouteName="Home">
            <BootomTabs.Screen name="Home" component={HomeScreen} />
            <BootomTabs.Screen name="Friends" component={FriendsScreen} />
            <BootomTabs.Screen name="Camera" component={CameraScreen} />
            <BootomTabs.Screen name="Inbox" component={InboxScreen} />
            <BootomTabs.Screen name="Profile" component={ProfileScreen} />
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
