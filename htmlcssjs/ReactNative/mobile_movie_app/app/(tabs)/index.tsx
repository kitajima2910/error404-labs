import { images } from "@/constants/images";
import React from "react";
import styled from "styled-components/native";

export default function Index() {
    return (
        <View>
            <Image
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 0,
                }}
                source={images.bg}
            />
        </View>
    );
}

const View = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #151312;
`;

const Text = styled.Text``;

const Image = styled.Image``;
