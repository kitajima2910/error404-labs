import { Dimensions, ImageBackground, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { s, vs } from "react-native-size-matters";
import VideoIcon from "../assets/icons";

const PhoneWidth = Dimensions.get("window").width;
const CardWidth = (PhoneWidth - s(16) * 3) / 2;

type Props = {
    image: string;
    title: string;
    date: string;
};

const MediataionCard = (props: Props) => {
    return (
        <ImageBackground
            source={{
                uri: props.image,
            }}
            style={styles.imageContainer}
            imageStyle={styles.image}
        >
            <View style={styles.overlay} />
            <View style={styles.liveBage}>
                <Text style={styles.liveText}>Live</Text>
            </View>
            <View style={styles.cardContent}>
                <Text style={styles.title}>{props.title}</Text>
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
                        {props.date}
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
        width: CardWidth,
        height: vs(140),
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
