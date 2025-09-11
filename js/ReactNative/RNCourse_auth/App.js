import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import { Colors } from "./constants/styles";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { useContext, useEffect, useState } from "react";
import IconButton from "./components/ui/IconButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";

const Stack = createNativeStackNavigator();

function AuthStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: Colors.primary500 },
                headerTintColor: "white",
                contentStyle: { backgroundColor: Colors.primary100 },
            }}
        >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
    );
}

function AuthenticatedStack() {
    const authCtx = useContext(AuthContext);

    const logoutHandler = () => {
        authCtx.logout();
    };

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: Colors.primary500 },
                headerTintColor: "white",
                contentStyle: { backgroundColor: Colors.primary100 },
            }}
        >
            <Stack.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={{
                    headerRight: ({ tintColor }) => {
                        return <IconButton icon="exit" color={tintColor} size={24} onPress={logoutHandler} />;
                    },
                }}
            />
        </Stack.Navigator>
    );
}

function Navigation() {
    const authCtx = useContext(AuthContext);

    return (
        <NavigationContainer>
            {!authCtx.isAuthenticated && <AuthStack />}
            {authCtx.isAuthenticated && <AuthenticatedStack />}
        </NavigationContainer>
    );
}

const Root = () => {
    const [isTryingLogin, setIsTryingLogin] = useState(true);
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        async function fetchToken() {
            const storeToken = await AsyncStorage.getItem("token");

            if (storeToken) {
                authCtx.authenticate(storeToken);
            }

            setIsTryingLogin(false);
        }
        fetchToken();
    }, []);

    if (isTryingLogin) {
        return <AppLoading />;
    }

    return <Navigation />;
};

export default function App() {
    return (
        <>
            <StatusBar style="light" />
            <AuthContextProvider>
                {/* <Navigation /> */}
                <Root />
            </AuthContextProvider>
        </>
    );
}
