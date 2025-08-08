import Categories from "@/components/index/Categories";
import Header from "@/components/index/Header";
import Popular from "@/components/index/Popular";
import Search from "@/components/index/Search";
import Title from "@/components/index/Title";
import * as SplashScreen from "expo-splash-screen";
import { ScrollView, StyleSheet, View } from "react-native";
import { mvs } from "react-native-size-matters";

SplashScreen.preventAutoHideAsync();

export default function Home() {
    return (
        <View style={styles.container}>
            {/* <SafeAreaView> */}
            {/* <Header /> */}
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header />
                <Title />
                <Search />
                <Categories />
                <Popular />
            </ScrollView>
            {/* </SafeAreaView> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: mvs(10),
        flex: 1,
    },
});
