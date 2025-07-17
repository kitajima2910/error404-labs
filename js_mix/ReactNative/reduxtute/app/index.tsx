import useProductStore from "@/zustand/productStore";
import React from "react";
import { Button, Text, View } from "react-native";

export default function Index() {
    // const product = useSelector((state: any) => state.product);
    // const dispatch = useDispatch();

    const { product, addProduct } = useProductStore();

    const onPress = () => {
        // dispatch(addProduct("pxh2910 đang học redux-toolkit"));
        addProduct("pxh2910 đang học redux-toolkit zustand");
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
