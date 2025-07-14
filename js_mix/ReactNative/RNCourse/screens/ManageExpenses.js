import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { GlobalStyles } from "../constants/styles";
import IconButton from "../components/ui/IconButton";

const ManageExpenses = ({ route, navigation }) => {
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense",
        });
    }, [navigation, isEditing]);

    const deleteExpenseHandler = () => {};

    return (
        <View style={styles.container}>
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton icon="trash" size={24} color={GlobalStyles.colors.error500} onPress={() => deleteExpenseHandler} />
                </View>
            )}
        </View>
    );
};

export default ManageExpenses;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: "center",
    },
});
