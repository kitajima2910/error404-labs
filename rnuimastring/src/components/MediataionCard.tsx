import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import { s, vs } from "react-native-size-matters";
import VideoIcon from "../assets/icons";

const MediataionCard = () => {
    return (
        <ImageBackground
            source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEsfiMUSaHNdvcCqNXL13Ote_UYX43DgBt7A&s",
            }}
            style={styles.imageContainer}
            imageStyle={styles.image}
        >
            <View style={styles.overlay} />
            <View style={styles.liveBage}>
                <Text style={styles.liveText}>Live</Text>
            </View>
            <View style={styles.cardContent}>
                <Text style={styles.title}>Mediataion</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <VideoIcon style={{ marginRight: s(5) }} />
                    <Text
                        style={{
                            color: "#fff",
                            fontSize: s(12),
                            fontFamily: "Montserrat-Regular",
                            fontWeight: "400",
                        }}
                    >
                        31st Jan - 09:00 am
                    </Text>
                </View>
            </View>
        </ImageBackground>
    );
};

export default MediataionCard;

const styles = StyleSheet.create({
    imageContainer: {
        position: "relative",
        width: s(166),
        height: vs(161),
        borderRadius: s(12),
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        borderRadius: s(12),
        opacity: 0.7,
    },
    cardContent: {
        position: "absolute",
        left: s(10),
        bottom: vs(10),
    },
    title: {
        fontFamily: "Montserrat-SemiBold",
        fontWeight: "600",
        fontSize: s(12),
        color: "#fff",
        marginBottom: vs(3),
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    liveBage: {
        position: "absolute",
        backgroundColor: "#E41111",
        width: s(39),
        height: vs(22),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: s(90),
        top: vs(10),
        right: s(10),
    },
    liveText: {
        color: "#fff",
        fontSize: s(10),
        fontWeight: "600",
        fontFamily: "Montserrat-SemiBold",
    },
});
