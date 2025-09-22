import { Alert, StyleSheet, Text, View } from "react-native";
import React, { use, useContext, useLayoutEffect, useState } from "react";
import { GlobalStyles } from "../constants/styles";
import IconButton from "../components/ui/IconButton";
import Button from "../components/ui/Button";
import { ExpensesContext } from "../store/context/expenses-context";
import useExpensesStore from "../store/zustand/expensesStore";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { isValidDate } from "../utils/date";
import { deleteExpense, storeExpenses, updateExpense } from "../utils/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

const ManageExpenses = ({ route, navigation }) => {

    const [submit, setSubmit] = useState(false)
    const [error, setError] = useState()

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
        description: "",
    });

    const [invalid, setInvalid] = useState({
        amount: false,
        date: false,
        description: false,
        formInvalid: false,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense",
        });
    }, [navigation, isEditing]);

    const deleteExpenseHandler = async () => {
        setSubmit(true)
        // expensesCtx.deleteExpense(editedExpenseId);
        try {
            await deleteExpense(editedExpenseId);
            expenseStoreDeleteExpense(editedExpenseId);
            navigation.goBack();
        } catch (error) {
            setError("Could not delete expense!")
            setSubmit(false)
        }
    };

    const cancelHandler = () => {
        navigation.goBack();
    };

    const confirmHandler = async () => {

        setSubmit(true)

        setIsSubmitting(true);

        try {
            const amountIsValid = !isNaN(inputValueParent.amount) && inputValueParent.amount > 0;
            const dateIsValid = inputValueParent.date.toString() !== "" && inputValueParent.date.toString() !== "Invalid Date";
            const descriptionIsValid = inputValueParent.description.trim().length > 0;

            if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
                // Alert.alert("Invalid Input", "Please check your input values", [{ text: "OKay", style: "destructive" }]);
                setInvalid({
                    amount: !amountIsValid,
                    date: !dateIsValid,
                    description: !descriptionIsValid,
                    formInvalid: true,
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

                await updateExpense(editedExpenseId, inputValueParent);
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
                const id = await storeExpenses(inputValueParent);
                expenseStoreAddExpense(id, inputValueParent);
            }
            navigation.goBack();
        } catch (error) {
            setError("Something went wrong!");
            setSubmit(false);
        }

    };

    const saveInputHandler = (inputValue) => {
        console.log("pxh parent:", inputValue);

        const expenseData = {
            amount: +inputValue.amount,
            date: new Date(inputValue.date),
            description: inputValue.description,
        };

        setInputValueParent(expenseData);
    };

    const formInvalidFromParent = (invalid) => {
        // console.log("pxh invalid: ", invalid);
        // setInvalid(invalid);
    };

    const errorHandler = () => {
        setError(null);
    };

    if (error && !submit) {
        return <ErrorOverlay message={error} />
    }

    if (submit) {
        return <LoadingOverlay />
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 0.5 }}>
                <ExpenseForm formInvalidFromParent={formInvalidFromParent} selectedExpense={selectedExpense} saveInputHandler={saveInputHandler} isSubmitting={isSubmitting} />
            </View>
            <View style={{ flex: 0.5 }}>
                {invalid.formInvalid && <Text style={[styles.errorText, { marginTop: isEditing ? 40 : 0 }]}>Invalid input values - please check your entered data!</Text>}
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
        fontSize: 16,
    },
});
