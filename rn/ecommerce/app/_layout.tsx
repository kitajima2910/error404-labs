import MainNav from "@/navigations/MainNav";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { StyleSheet, View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [fontsLoaded, fontsError] = useFonts({
        "Poppins-Bold": require("@/assets/fonts/Poppins/Poppins-Bold.ttf"),
        "Poppins-Light": require("../assets/fonts/Poppins/Poppins-Light.ttf"),
        "Poppins-Medium": require("../assets/fonts/Poppins/Poppins-Medium.ttf"),
        "Poppins-Regular": require("../assets/fonts/Poppins/Poppins-Regular.ttf"),
        "Poppins-SemiBold": require("../assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontsError) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontsError]);

    if (fontsError) {
        console.error("Font loading error:", fontsError);
    }

    if (!fontsLoaded && !fontsError) {
        return null;
    }

    return (
        <View onLayout={onLayoutRootView} style={styles.container}>
            {/* <BottomTabs /> */}
            {/* <StackTabs /> */}
            <MainNav />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
