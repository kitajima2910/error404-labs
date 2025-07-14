import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";

const ManageExpenses = ({ route, navigation }) => {
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense",
        });
    }, [navigation, isEditing]);

    return (
        <View>
            <Text>ManageExpenses</Text>
        </View>
    );
};

export default ManageExpenses;

const styles = StyleSheet.create({});
