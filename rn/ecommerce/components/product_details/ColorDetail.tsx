import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ms, mvs } from "react-native-size-matters";

const data = [
    {
        id: 1,
        color: "rgba(145, 161, 176, 1)",
        selected: true,
    },
    {
        id: 2,
        color: "rgba(177, 29, 29, 0.83)",
        selected: false,
    },
    {
        id: 3,
        color: "rgba(31, 68, 163, 0.76)",
        selected: false,
    },
    {
        id: 4,
        color: "rgba(159, 99, 42, 0.83)",
        selected: false,
    },
    {
        id: 5,
        color: "rgba(29, 117, 43, 0.86)",
        selected: false,
    },
    {
        id: 6,
        color: "rgba(0, 0, 0, 0.79)",
        selected: false,
    },
];

const ColorDetail = () => {
    const [dataClone, setDataClone] = useState(data);

    const handleClick = (id: any) => {
        let newData = data.map((item) => {
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

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Colors</Text>
            <View style={styles.listColors}>
                {dataClone.map((item) => (
                    <View
                        style={[
                            {
                                backgroundColor: "rgba(255, 255, 255, 1)",
                                borderRadius: ms(18),
                                marginRight: ms(12),
                                width: ms(36),
                                height: mvs(36),
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderWidth: item.selected ? 1 : 0,
                                borderColor: "rgba(145, 161, 176, 1)",
                            },
                        ]}
                        key={item.id}
                    >
                        <TouchableOpacity
                            onPress={() => handleClick(item.id)}
                            style={{
                                width: ms(30),
                                height: mvs(30),
                                borderRadius: ms(15),
                                backgroundColor: item.color,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        ></TouchableOpacity>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default ColorDetail;

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
    listColors: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    },
});
