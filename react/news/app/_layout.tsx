import StackNavigation from "@/navigations/StackNavigation";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StackNavigation />
        </SafeAreaView>
    );
}
