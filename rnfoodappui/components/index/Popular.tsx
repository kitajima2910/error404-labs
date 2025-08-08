import popularData from "@/assets/data/popularData";
import { VuongMien } from "@/assets/icons";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ms, mvs } from "react-native-size-matters";

const Popular = () => {
    const { push } = router;

    const goToDetails = () => {};

    const renderPopularItem = (item: any, index: number) => {
        return (
            <TouchableOpacity
                onPress={goToDetails}
                key={index}
                style={styles.containerItem}
            >
                <View style={styles.containerItemTextDetails}>
                    <View style={styles.containerItemTextDetailsHeader}>
                        <VuongMien
                            style={styles.containerItemTextDetailsHeaderIcon}
                        />
                        <Text
                            style={styles.containerItemTextDetailsHeaderTitle}
                        >
                            top of the week
                        </Text>
                    </View>
                    <Text style={styles.containerItemTextDetailsContentTitle}>
                        {item.title}
                    </Text>
                    <Text style={styles.containerItemTextDetailsContentText}>
                        Weight {item.weight}
                    </Text>
                    <View style={styles.containerItemTextDetailsFooter}>
                        <TouchableOpacity style={styles.containerItemButton}>
                            <Ionicons style={styles.icon} name="add" />
                        </TouchableOpacity>
                        <View style={styles.containerItemTextDetailsFooterStar}>
                            <Ionicons style={styles.start} name="star" />
                            <Text style={styles.starText}>5.0</Text>
                        </View>
                    </View>
                </View>
                <Image source={item.image} />
            </TouchableOpacity>
        );
    };

    return (
        <View style={[styles.container]}>
            <Text style={styles.containerTextTitle}>Popular</Text>
            {/* <FlatList
                data={popularData}
                renderItem={({ item }) => renderPopularItem(item)}
                keyExtractor={(item) => item.id.toString()}
            /> */}
            {popularData.map((item, index) => {
                return renderPopularItem(item, index);
            })}
        </View>
    );
};

export default Popular;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: ms(20),
        marginBottom: mvs(30),
    },
    containerTextTitle: {
        fontFamily: "Montserrat-Bold",
        fontWeight: "700",
        fontSize: ms(16),
        color: "#000",
        marginBottom: mvs(11),
    },
    containerItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        marginBottom: mvs(20),
        borderRadius: ms(25),
        paddingTop: mvs(20),
        overflow: "hidden",
    },
    containerItemTextDetails: {},
    containerItemTextDetailsHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: mvs(20),
        paddingLeft: ms(20),
    },
    containerItemTextDetailsHeaderIcon: {
        marginRight: ms(10),
    },
    containerItemTextDetailsHeaderTitle: {
        fontFamily: "Montserrat-Bold",
        fontWeight: "600",
        fontSize: ms(14),
        color: "#000",
    },
    containerItemTextDetailsContentTitle: {
        fontFamily: "Montserrat-Bold",
        fontWeight: "600",
        fontSize: ms(14),
        color: "#313234",
        marginBottom: mvs(5),
        paddingLeft: ms(20),
    },
    containerItemTextDetailsContentText: {
        fontFamily: "Montserrat-Regular",
        fontWeight: "500",
        fontSize: ms(12),
        color: "#C4C4C4",
        marginBottom: mvs(10),
        paddingLeft: ms(20),
    },
    containerItemTextDetailsFooter: {
        flexDirection: "row",
        alignItems: "center",
    },
    containerItemTextDetailsFooterStar: {
        flexDirection: "row",
        alignItems: "center",
    },
    start: {
        color: "#313234",
        width: ms(10),
        height: mvs(10),
        marginRight: ms(5),
    },
    starText: {
        fontFamily: "Montserrat-Blod",
        fontWeight: "600",
        fontSize: ms(12),
        color: "#000",
    },
    icon: {
        width: ms(20),
        height: mvs(20),
        color: "#000",
        fontSize: ms(20),
    },
    containerItemButton: {
        backgroundColor: "#F5CA48",
        width: ms(90),
        height: mvs(53),
        justifyContent: "center",
        alignItems: "center",
        borderTopRightRadius: ms(25),
        borderBottomLeftRadius: ms(25),
        marginRight: ms(20),
    },
});
