import popularData from "@/assets/data/popularData";
import ButtonOrder from "@/components/details/ButtonOrder";
import Header from "@/components/details/Header";
import Info from "@/components/details/Info";
import Ingredients from "@/components/details/Ingredients";
import Price from "@/components/details/Price";
import Title from "@/components/details/Title";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

const Details = () => {
    const { id } = useLocalSearchParams();

    const item = popularData.find((item) => item.id === id) as any;

    return (
        <View style={styles.container}>
            <Header />
            <Title {...item} />
            <Price {...item} />
            <Info {...item} />
            <Ingredients {...item} />
            <ButtonOrder />
        </View>
    );
};

export default Details;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
