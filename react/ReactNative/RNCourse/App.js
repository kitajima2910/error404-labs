import { ImageBackground, StyleSheet, View, SafeAreaView } from "react-native";
import GoalsApp from "./components/GoalsApp";
import MiniGameApp from "./components/MiniGameApp";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "./constants/colors";
import MealsApp from "./components/MealsApp";
import TheExpenseTrackerApp from "./components/TheExpenseTrackerApp";
// import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
    return (
        <>
            {/* <SafeAreaView style={styles.rootScreen}>
                <GoalsApp />
                <LinearGradient colors={[Colors.primary700, Colors.accent500]} style={styles.rootScreen}>
                    <ImageBackground imageStyle={styles.ImageBackgroundStyle} source={require("./assets/images/background.png")} resizeMode="cover" style={styles.rootScreen}>
                        <MiniGameApp />
                    </ImageBackground>
                </LinearGradient>
                <MealsApp />
            </SafeAreaView> */}
            <TheExpenseTrackerApp />
        </>
    );
}

const styles = StyleSheet.create({
    rootScreen: {
        flex: 1,
        // backgroundColor: "#ddb52f",
    },
    ImageBackgroundStyle: {
        opacity: 0.15,
    },
});
