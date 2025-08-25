import React, { useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { ms, mvs } from "react-native-size-matters";

const dataSize = [
    {
        id: 1,
        size: "S",
        selected: true,
    },
    {
        id: 2,
        size: "M",
        selected: false,
    },
    {
        id: 3,
        size: "L",
        selected: false,
    },
    {
        id: 4,
        size: "XL",
        selected: false,
    },
];

const SizeDetail = () => {
    const [dataClone, setDataClone] = useState(dataSize);

    const handleClick = (id: any) => {
        let newData = dataClone.map((item) => {
            return {
                ...item,
                selected: false,
            };
        });

        newData = newData.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    selected: true,
                };
            }
            return item;
        });

        setDataClone(newData);
    };

    const RenderSize = () => {
        return (
            <FlatList
                data={dataClone}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => handleClick(item.id)}
                        style={styles.itemSize}
                    >
                        <Text
                            style={[
                                styles.textSize,
                                item.selected && styles.textSizeClick,
                            ]}
                        >
                            {item.size}
                        </Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Size</Text>
            <RenderSize />
        </View>
    );
};

export default SizeDetail;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: ms(30),
        marginBottom: mvs(30),
    },
    text: {
        fontFamily: "Poppins-SemiBold",
        fontWeight: "500",
        fontSize: ms(20),
        color: "rgba(68, 68, 68, 1)",
    },
    listSize: {},
    itemSize: {
        width: ms(36),
        height: mvs(36),
        borderRadius: ms(18),
        backgroundColor: "rgba(255, 255, 255, 1)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginRight: ms(12),
    },
    textSize: {},
    textSizeClick: {
        color: "rgba(229, 91, 91, 1)",
    },
});
