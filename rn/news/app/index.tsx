import { View } from "react-native";
import SplashScreen from "./SplashScreen";

export default function Index() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <SplashScreen />
        </View>
    );
}
