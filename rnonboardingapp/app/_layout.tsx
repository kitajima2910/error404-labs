import Colors from "@/assets/colors/palette";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { StyleSheet, View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [fontsLoaded, fontsError] = useFonts({
        "OpenSans-Bold": require("@/assets/fonts/Open_Sans/OpenSans-Bold.ttf"),
        "OpenSans-Regular": require("@/assets/fonts/Open_Sans/OpenSans-Regular.ttf"),
        "OpenSans-SemiBold": require("@/assets/fonts/Open_Sans/OpenSans-SemiBold.ttf"),
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
            <Slot />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
});
