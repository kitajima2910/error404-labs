import React from "react";
import { KeyboardAvoidingView, Text, View } from "react-native";

function AuthScreen() {
    return (
        <KeyboardAvoidingView>
            <View>
                <Text>Bạn cần tạo tài khoản</Text>
            </View>
        </KeyboardAvoidingView>
    );
}

export default AuthScreen;
