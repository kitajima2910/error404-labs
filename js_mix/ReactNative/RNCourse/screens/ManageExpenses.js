import { Alert, StyleSheet, Text, View } from "react-native";
import React, { use, useContext, useLayoutEffect, useState } from "react";
import { GlobalStyles } from "../constants/styles";
import IconButton from "../components/ui/IconButton";
import Button from "../components/ui/Button";
import { ExpensesContext } from "../store/context/expenses-context";
import useExpensesStore from "../store/zustand/expensesStore";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { isValidDate } from "../utils/date";

const ManageExpenses = ({ route, navigation }) => {
    const expensesCtx = useContext(ExpensesContext);

    const expenseStoreAddExpense = useExpensesStore((state) => state.addExpense);
    const expenseStoreDeleteExpense = useExpensesStore((state) => state.deleteExpense);
    const expenseStoreUpdateExpense = useExpensesStore((state) => state.updateExpense);
    const expenseStoreExpenses = useExpensesStore((state) => state.expenses);

    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    const selectedExpense = expenseStoreExpenses.find((expense) => expense.id === editedExpenseId);

    const [inputValueParent, setInputValueParent] = useState({
        amount: 0,
        date: "",
        description: ""
    });

    const [invalid, setInvalid] = useState({
        amount: false,
        date: false,
        description: false,
        formInvalid: false
    });

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

        const amountIsValid = !isNaN(inputValueParent.amount) && inputValueParent.amount > 0;
        const dateIsValid = inputValueParent.date.toString() !== "" && inputValueParent.date.toString() !== "Invalid Date"
        const descriptionIsValid = inputValueParent.description.trim().length > 0;

        if (invalid.formInvalid) {
            // Alert.alert("Invalid Input", "Please check your input values", [{ text: "OKay", style: "destructive" }]);
            setInvalid({
                amount: !amountIsValid,
                date: !dateIsValid,
                description: !descriptionIsValid,
                formInvalid: true
            });
            return;
        }

        if (isEditing) {
            // expensesCtx.updateExpense(editedExpenseId, {
            //     description: "New Expense <3",
            //     amount: 29.99,
            //     date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()),
            // });

            // expenseStoreUpdateExpense(editedExpenseId, {
            //     description: "New Expense Zustand <3",
            //     amount: 99.99,
            //     date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()),
            // });

            expenseStoreUpdateExpense(editedExpenseId, inputValueParent);
        } else {
            // expensesCtx.addExpense({
            //     description: "New Expense",
            //     amount: 19.99,
            //     date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()),
            // });

            // expenseStoreAddExpense({
            //     description: "New Expense Zustand",
            //     amount: 99.99,
            //     date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()),
            // });

            expenseStoreAddExpense(inputValueParent);
        }
        navigation.goBack();
    };

    const saveInputHandler = (inputValue) => {
        // console.log("pxh parent:", inputValue);

        const expenseData = {
            amount: +inputValue.amount,
            date: new Date(inputValue.date),
            description: inputValue.description
        }

        setInputValueParent(expenseData);
    };

    const formInvalidFromParent = (invalid) => {
        console.log("pxh invalid: ", invalid);
        setInvalid(invalid);
    };

    return (
        <View style={styles.container}>
            <ExpenseForm formInvalidFromParent={formInvalidFromParent} selectedExpense={selectedExpense} saveInputHandler={saveInputHandler} invalid={invalid} />

            {invalid.formInvalid && (<Text style={[styles.errorText, { marginTop: isEditing ? 40 : 0 }]}>Invalid input values - please check your entered data!</Text>)}

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
    errorText: {
        textAlign: "center",
        color: GlobalStyles.colors.error500,
        margin: 8,
        marginBottom: 30,
        fontSize: 16
    },
});
