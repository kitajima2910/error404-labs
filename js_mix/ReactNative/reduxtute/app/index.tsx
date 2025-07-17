import { addProduct } from "@/redux/productSlice";
import React from "react";
import { Button, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function Index() {
    const product = useSelector((state: any) => state.product);
    const dispatch = useDispatch();

    const onPress = () => {
        dispatch(addProduct("pxh2910 đang học redux-toolkit"));
    };

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text>{product}</Text>
            <Button title="set state" onPress={onPress} />
        </View>
    );
}
