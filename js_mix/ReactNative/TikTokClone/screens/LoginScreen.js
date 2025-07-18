import { View, Text } from "react-native";
import React from "react";
import { Button } from "@react-navigation/elements";

const LoginScreen = ({ navigation }) => {
    const handleLogin = () => {
        navigation.replace("Tabs");
    };

    return (
        <View className="flex-1 items-center justify-center">
            <Text className="text-3xl font-bold">LoginScreen</Text>
            <Button onPress={handleLogin}>Login</Button>
        </View>
    );
};

export default LoginScreen;
