import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import IntroScreen from "./src/screens/IntroScreen";
import UserAvatar from "./src/components/UserAvatar";
import ContactUsScreen from "./src/screens/ContactUsScreen";

export default function App() {
    return <ContactUsScreen />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
