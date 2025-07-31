import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
    CashIcon,
    MasterCardIcon,
    PaypalIcon,
    VisaIcon,
} from "../assets/icons";
import PayMethodCard from "./PayMethodCard";
import { s, vs } from "react-native-size-matters";

const PaymentMethods = [
    { label: "Cash", icon: <CashIcon /> },
    { label: "Visa", icon: <VisaIcon /> },
    { label: "Master Card", icon: <MasterCardIcon /> },
    { label: "Paypal", icon: <PaypalIcon /> },
];

const PaymentList = () => {
    const [selectedMethod, setSelectedMethod] = useState("");

    return (
        <View>
            <FlatList
                data={PaymentMethods}
                keyExtractor={(item) => item.label}
                renderItem={({ item }) => (
                    <PayMethodCard
                        label={item.label}
                        icon={item.icon}
                        onPress={() => setSelectedMethod(item.label)}
                        isSelected={selectedMethod === item.label}
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: s(16), paddingTop: vs(16) }}
            />
        </View>
    );
};

export default PaymentList;

const styles = StyleSheet.create({});
