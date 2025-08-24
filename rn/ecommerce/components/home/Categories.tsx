import React, { useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { ms, mvs } from "react-native-size-matters";

const data = ["Trending Now", "All", "New", "Clothing", "Shoes", "Accessories"];

const Categories = () => {
    const [selectedItem, setSelectedItem] = useState("Trending Now");

    const handleClick = (item: string) => {
        setSelectedItem(item);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => handleClick(item)}
                        style={[
                            styles.item,
                            selectedItem === item && styles.itemClick,
                        ]}
                    >
                        <Text
                            style={[
                                styles.text,
                                selectedItem === item && styles.textClick,
                            ]}
                        >
                            {item}
                        </Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

export default Categories;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: ms(30),
        marginBottom: mvs(30),
    },
    item: {
        backgroundColor: "rgba(223, 220, 220, 1)",
        borderRadius: ms(16),
        marginRight: ms(10),
    },
    text: {
        fontFamily: "Poppins-Regular",
        fontWeight: "600",
        fontSize: ms(16),
        color: "rgba(147, 143, 143, 1)",
        paddingTop: mvs(7),
        paddingBottom: mvs(5),
        paddingLeft: ms(20),
        paddingRight: ms(20),
    },
    itemClick: {
        backgroundColor: "rgba(233, 110, 110, 1)",
    },
    textClick: {
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Poppins-Regular",
        fontWeight: "600",
        fontSize: ms(16),
    },
});
