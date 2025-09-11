import { Stack } from "expo-router";
import React from "react";
import { Provider } from "react-redux";
import store from "../redux/store";

export default function RootLayout() {
    return (
        <Provider store={store}>
            <Stack />
        </Provider>
    );
}
