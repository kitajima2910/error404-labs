import React from "react";
import { StyleSheet } from "react-native";

import Header from "@/components/home/Header";
import Search from "@/components/home/Search";
import Title from "@/components/home/Title";
import Container from "@/utils/Container";

const Home = () => {
    return (
        <Container>
            <Header />
            <Title title={"Match Your Style"} />
            <Search />
        </Container>
    );
};

export default Home;

const styles = StyleSheet.create({});
