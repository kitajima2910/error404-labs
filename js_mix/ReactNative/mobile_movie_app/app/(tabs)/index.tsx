import React from "react";
import styled from "styled-components/native";

export default function Index() {
    return (
        <View>
            <Text>Welcome!</Text>
        </View>
    );
}

const View = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const Text = styled.Text`
    color: #ab8bff;
    font-size: 38px;
    font-weight: 500;
`;
