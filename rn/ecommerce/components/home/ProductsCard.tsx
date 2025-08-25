import React, { useState } from "react";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { ms, mvs } from "react-native-size-matters";

import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const data = [
    {
        id: 1,
        image: require("@/assets/images/image_clone_product.jpg"),
        title: "Jacket Jeans 1",
        price: "$45.9",
        like: false,
    },
    {
        id: 2,
        image: require("@/assets/images/image_clone_product.jpg"),
        title: "Jacket Jeans 2",
        price: "$45.9",
        like: false,
    },
    {
        id: 3,
        image: require("@/assets/images/image_clone_product.jpg"),
        title: "Jacket Jeans 3",
        price: "$45.9",
        like: false,
    },
    {
        id: 4,
        image: require("@/assets/images/image_clone_product.jpg"),
        title: "Jacket Jeans 4",
        price: "$45.9",
        like: false,
    },
    {
        id: 5,
        image: require("@/assets/images/image_clone_product.jpg"),
        title: "Jacket Jeans 5",
        price: "$45.9",
        like: false,
    },
];

const ProductCard = () => {
    const [dataClone, setDataClone] = useState(data);

    const handleLike = (item: any) => {
        const newData = dataClone.map((data) => {
            if (data.id === item.id) {
                return {
                    ...data,
                    like: !data.like,
                };
            }
            return data;
        });
        setDataClone(newData);
    };

    const navigation = useNavigation<any>();

    const handleNavigate = (item: any) => {
        navigation.navigate("ProductDetails", { dataID: item.id });
    };

    return (
        <FlatList
            data={dataClone}
            renderItem={({ item }) => (
                <TouchableOpacity
                    style={styles.container}
                    onPress={() => handleNavigate(item)}
                >
                    <View style={styles.wrapperImage}>
                        <Image style={styles.image} source={item.image} />
                        <TouchableOpacity
                            onPress={() => handleLike(item)}
                            style={styles.wrapperLike}
                        >
                            <AntDesign
                                name={item.like ? "heart" : "hearto"}
                                size={17}
                                color="rgba(229, 91, 91, 1)"
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.price}>{item.price}</Text>
                </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{
                justifyContent: "space-between",
                marginBottom: mvs(30),
                marginHorizontal: ms(15),
            }}
        />
    );
};

export default ProductCard;

const styles = StyleSheet.create({
    container: {
        // backgroundColor: "red",
        marginBottom: mvs(30),
        width: ms(167),
        height: mvs(256),
    },
    wrapperImage: {
        marginBottom: mvs(10),
        borderRadius: 12,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        borderRadius: ms(20),
    },
    title: {
        fontFamily: "Poppins-Regular",
        fontWeight: "500",
        fontSize: ms(18),
        color: "rgba(68, 68, 68, 1)",
    },
    price: {
        fontFamily: "Poppins-Regular",
        fontWeight: "500",
        fontSize: ms(18),
        color: "rgba(156, 156, 156, 1)",
    },
    wrapperLike: {
        position: "absolute",
        top: mvs(15),
        right: ms(15),
        width: ms(34),
        height: mvs(34),
        borderRadius: ms(22),
        backgroundColor: "rgba(255, 255, 255, 1)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
});
