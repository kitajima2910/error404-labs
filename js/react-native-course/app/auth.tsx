import { useAuth } from "@/lib/auth-context";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";

function AuthScreen() {
    const [isSignUp, setIsSignUp] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string | null>("");

    const theme = useTheme()

    const { signIn, signUp } = useAuth()

    const router = useRouter()

    const handleSwitchMode = () => {
        setIsSignUp(!isSignUp);
    };

    const handleAuth = async () => {
        if (!email || !password) {
            setError("Vui lòng điền đầy đủ thông tin!")
            return;
        }

        if (password.length < 6) {
            setError("Mật khẩu phải nhất 6 ký tự!")
            return
        }

        setError(null)

        if (isSignUp) {
            const error = await signUp(email, password)
            if (error) {
                setError(error)
                return;
            }
        } else {
            const error = await signIn(email, password)
            if (error) {
                setError(error)
                return;
            }
        }

        router.replace("/")
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.text}>{isSignUp ? "Tạo tài khoản" : "Chào mừng bạn quay trở lại"}</Text>

                <TextInput onChangeText={setEmail} style={styles.textInput} placeholder="example@gmail.com" keyboardType="email-address" autoCapitalize="none" label={"Địa chỉ email"} mode="outlined" />
                <TextInput secureTextEntry={true} onChangeText={setPassword} style={styles.textInput} keyboardType="default" autoCapitalize="none" label={"Mật khẩu"} mode="outlined" />

                { error && <Text style={{ color: theme.colors.error, marginBottom: 16 }}>{error}</Text> }

                <Button style={styles.button} mode="contained" onPress={() => handleAuth()}>{isSignUp ? "Đăng Ký" : "Đăng Nhập"}</Button>
                <Button mode="text" onPress={() => handleSwitchMode()}>
                    {isSignUp ? "Bạn đã có tài khoản? Đăng Nhập" : "Bạn chưa có tài khoản? Đăng Ký"}
                </Button>
            </View>
        </KeyboardAvoidingView>
    );
}

export default AuthScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    content: {
        flex: 1,
        padding: 16,
        justifyContent: "center",
    },
    text: {
        textAlign: "center",
        marginBottom: 16,
        fontWeight: "bold",
        fontSize: 18,
        textTransform: "uppercase"
    },
    textInput: {
        marginBottom: 16
    },
    button: {
        marginBottom: 16
    }
});
