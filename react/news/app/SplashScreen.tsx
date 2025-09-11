import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { ms, mvs } from "react-native-size-matters";

const SplashScreen = () => {
    const navigation = useNavigation<any>();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace("drawer");
        }, 3000);
        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <LottieView
                style={styles.splashCard}
                source={require("@/assets/news.json")}
                autoPlay
                loop
            />
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    splashCard: {
        width: ms(300),
        height: mvs(300),
    },
});
