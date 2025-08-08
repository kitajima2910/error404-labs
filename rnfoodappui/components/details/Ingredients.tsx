import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { ms, mvs } from "react-native-size-matters";

type Props = {
    ingredients: any;
};

const Ingredients = (props: Props) => {
    const renderItem = (item: any) => {
        return (
            <View style={styles.item}>
                <Image source={item.image} />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Ingredients</Text>
            <FlatList
                data={props.ingredients as any}
                renderItem={({ item }) => renderItem(item)}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: ms(20),
                    gap: ms(15),
                    // backgroundColor: "pink",
                    paddingVertical: mvs(5),
                }}
            />
        </View>
    );
};

export default Ingredients;

const styles = StyleSheet.create({
    container: {
        marginBottom: mvs(60),
    },
    text: {
        fontFamily: "Montserrat-Bold",
        fontWeight: "700",
        fontSize: ms(16),
        color: "#000",
        paddingStart: ms(20),
        marginBottom: mvs(20),
    },
    item: {
        width: ms(100),
        height: mvs(80),
        borderRadius: ms(20),
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.1)",
    },
});
