import Header from "@/components/home/Header";
import ButtonDetail from "@/components/product_details/ButtonDetail";
import ColorDetail from "@/components/product_details/ColorDetail";
import ImageContent from "@/components/product_details/ImageContent";
import Name_Price from "@/components/product_details/Name_Price";
import SizeDetail from "@/components/product_details/SizeDetail";
import Container from "@/utils/Container";
import { useRoute } from "@react-navigation/native";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

const ProductDetails = () => {
    const route = useRoute<any>();

    const { dataID } = route.params;

    return (
        <Container>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header />
                <ImageContent />
                <Name_Price />
                <SizeDetail />
                <ColorDetail />
                <ButtonDetail />
            </ScrollView>
        </Container>
    );
};

export default ProductDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
