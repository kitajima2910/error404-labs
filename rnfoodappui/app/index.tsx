import Header from "@/components/index/Header";
import Search from "@/components/index/Search";
import Title from "@/components/index/Title";
import * as SplashScreen from "expo-splash-screen";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { mvs } from "react-native-size-matters";

SplashScreen.preventAutoHideAsync();

export default function Index() {
    return (
        <View style={styles.container}>
            <SafeAreaView>
                <Header />
                <Title />
                <Search />
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: mvs(60),
    },
});
