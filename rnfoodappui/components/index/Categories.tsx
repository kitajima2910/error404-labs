import categoriesData from "@/assets/data/categoriesData";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { ms, mvs } from "react-native-size-matters";

const Categories = () => {
    const renderCategoryItem = (item: any) => {
        return (
            <View
                style={[
                    styles.containerItem,
                    item.selected ? { backgroundColor: "#F5CA48" } : {},
                ]}
            >
                <Image style={styles.containerItemImage} source={item.image} />
                <Text style={styles.containerItemText}>{item.title}</Text>
                <TouchableOpacity
                    style={[
                        styles.containerItemButtonDetails,
                        item.selected ? { backgroundColor: "#fff" } : {},
                    ]}
                >
                    <Ionicons
                        name="chevron-forward-outline"
                        size={ms(15)}
                        color={item.selected ? "#000" : "#fff"}
                    />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textTitle}>Categories</Text>
            <FlatList
                data={categoriesData}
                renderItem={({ item }) => renderCategoryItem(item)}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

export default Categories;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: ms(20),
        marginBottom: mvs(20),
    },
    textTitle: {
        fontFamily: "Montserrat-Regular",
        fontWeight: "700",
        fontSize: ms(16),
        color: "#000",
        marginBottom: mvs(15),
    },
    containerItem: {
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#fff",
        marginRight: ms(20),
        // padding: ms(20),
        borderRadius: ms(20),
        width: ms(105),
        height: mvs(177),
        justifyContent: "center",
    },
    containerItemImage: {
        marginBottom: mvs(10),
    },
    containerItemText: {
        fontFamily: "Montserrat-Blod",
        fontWeight: "600",
        fontSize: ms(14),
        color: "#313234",
        marginBottom: mvs(20),
    },
    containerItemButtonDetails: {
        width: ms(26),
        height: mvs(26),
        backgroundColor: "#F26C68",
        borderRadius: ms(26),
        justifyContent: "center",
        alignItems: "center",
    },
});
