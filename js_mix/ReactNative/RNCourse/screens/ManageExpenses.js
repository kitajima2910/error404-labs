import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { GlobalStyles } from "../constants/styles";
import IconButton from "../components/ui/IconButton";
import Button from "../components/ui/Button";

const ManageExpenses = ({ route, navigation }) => {
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense",
        });
    }, [navigation, isEditing]);

    const deleteExpenseHandler = () => {
        navigation.goBack();
    };

    const cancelHandler = () => {
        navigation.goBack();
    };

    const confirmHandler = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonsContainer}>
                <Button style={styles.button} mode="flat" onPress={cancelHandler}>
                    Cancel
                </Button>
                <Button style={styles.button} onPress={confirmHandler}>
                    {isEditing ? "Update" : "Add"}
                </Button>
            </View>
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton icon="trash" size={24} color={GlobalStyles.colors.error500} onPress={deleteExpenseHandler} />
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
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
});
