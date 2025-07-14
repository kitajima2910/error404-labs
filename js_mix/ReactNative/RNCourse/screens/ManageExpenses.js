import { StyleSheet, Text, View } from "react-native";
import React, { use, useContext, useLayoutEffect } from "react";
import { GlobalStyles } from "../constants/styles";
import IconButton from "../components/ui/IconButton";
import Button from "../components/ui/Button";
import { ExpensesContext } from "../store/context/expenses-context";
import useExpensesStore from "../store/zustand/expensesStore";

const ManageExpenses = ({ route, navigation }) => {
    const expensesCtx = useContext(ExpensesContext);

    const expenseStoreAddExpense = useExpensesStore((state) => state.addExpense);
    const expenseStoreDeleteExpense = useExpensesStore((state) => state.deleteExpense);
    const expenseStoreUpdateExpense = useExpensesStore((state) => state.updateExpense);

    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense",
        });
    }, [navigation, isEditing]);

    const deleteExpenseHandler = () => {
        // expensesCtx.deleteExpense(editedExpenseId);
        expenseStoreDeleteExpense(editedExpenseId);
        navigation.goBack();
    };

    const cancelHandler = () => {
        navigation.goBack();
    };

    const confirmHandler = () => {
        if (isEditing) {
            // expensesCtx.updateExpense(editedExpenseId, {
            //     description: "New Expense <3",
            //     amount: 29.99,
            //     date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()),
            // });

            expenseStoreUpdateExpense(editedExpenseId, {
                description: "New Expense Zustand <3",
                amount: 99.99,
                date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()),
            });
        } else {
            // expensesCtx.addExpense({
            //     description: "New Expense",
            //     amount: 19.99,
            //     date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()),
            // });

            expenseStoreAddExpense({
                description: "New Expense Zustand",
                amount: 99.99,
                date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()),
            });
        }
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
