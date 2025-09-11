import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
    const [loaded, error] = useFonts({
        "Montserrat-Regular": require("@/assets/fonts/Montserrat/static/Montserrat-Regular.ttf"),
        "Montserrat-Bold": require("@/assets/fonts/Montserrat/static/Montserrat-Bold.ttf"),
        "Montserrat-Medium": require("@/assets/fonts/Montserrat/static/Montserrat-Medium.ttf"),
        "Montserrat-SemiBold": require("@/assets/fonts/Montserrat/static/Montserrat-SemiBold.ttf"),
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* <View
                style={{
                    backgroundColor: "red",
                    height: StatusBar.length + mvs(50),
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text
                    style={{
                        color: "white",
                        fontSize: mvs(20),
                    }}
                >
                    Header
                </Text>
            </View> */}
            <Slot />
            {/* <View
                style={{
                    backgroundColor: "blue",
                    height: StatusBar.length + mvs(50),
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text style={{ color: "white", fontSize: mvs(20) }}>
                    Footer
                </Text>
            </View> */}
        </SafeAreaView>
    );
}
