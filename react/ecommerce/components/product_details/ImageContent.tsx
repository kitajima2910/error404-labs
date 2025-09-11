import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { mvs } from "react-native-size-matters";

const ImageContent = () => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require("@/assets/images/image_clone_product.jpg")}
            />
        </View>
    );
};

export default ImageContent;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "pink",
        width: "100%",
        height: mvs(413),
        marginBottom: mvs(15),
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
});
