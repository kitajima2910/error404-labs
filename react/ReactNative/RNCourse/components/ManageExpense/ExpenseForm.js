import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import Input from "./Input";

const ExpenseForm = ({ selectedExpense, saveInputHandler, formInvalidFromParent, isSubmitting }) => {
    const [inputValue, setInputValue] = useState({
        amount: selectedExpense ? selectedExpense.amount.toString() : "",
        date: selectedExpense ? selectedExpense.date.toISOString().slice(0, 10) : "",
        description: selectedExpense ? selectedExpense.description : "",
    });

    const [invalidChild, setInvalidChild] = useState({
        amount: false,
        date: false,
        description: false,
        formInvalid: false,
    });

    const inputChangeHandler = (inputKey, enteredValue) => {
        // Tạo bản sao mới của inputValue sau khi thay đổi
        const updatedInput = {
            ...inputValue,
            [inputKey]: enteredValue,
        };

        // Cập nhật state inputValue
        setInputValue(updatedInput);

        // Gửi dữ liệu cho parent
        saveInputHandler(updatedInput);

        if (isSubmitting) {
            // Validate realtime
            const amountIsValid = !isNaN(updatedInput.amount) && +updatedInput.amount > 0;
            const dateIsValid = updatedInput.date && !isNaN(Date.parse(updatedInput.date));
            const descriptionIsValid = updatedInput.description.trim().length > 0;

            setInvalidChild({
                amount: !amountIsValid,
                date: !dateIsValid,
                description: !descriptionIsValid,
                formInvalid: !amountIsValid || !dateIsValid || !descriptionIsValid,
            });
        }

        formInvalidFromParent(invalidChild);
    };

    console.log("pxh invalidChild: ", invalidChild);

    return (
        <View style={[styles.form, { flex: 1 }]}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input
                    invalid={invalidChild.amount}
                    style={styles.rowInput}
                    label="Amount"
                    textInputConfig={{
                        keyboardType: "decimal-pad",
                        onChangeText: (newValue) => inputChangeHandler("amount", newValue),
                        value: inputValue.amount,
                    }}
                />
                <Input
                    invalid={invalidChild.date}
                    style={styles.rowInput}
                    label="Date"
                    textInputConfig={{
                        placeholder: "YYYY-MM-DD",
                        maxLength: 10,
                        onChangeText: (newValue) => inputChangeHandler("date", newValue),
                        value: inputValue.date,
                    }}
                />
            </View>
            <Input
                invalid={invalidChild.description}
                style={[styles.rowInput, { marginBottom: 8 }]}
                label="Description"
                textInputConfig={{
                    multiline: true,
                    onChangeText: (newValue) => inputChangeHandler("description", newValue),
                    value: inputValue.description,
                }}
            />
        </View>
    );
};

export default ExpenseForm;

const styles = StyleSheet.create({
    form: {
        marginTop: 40,
        // backgroundColor: "red",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
        marginBottom: 24,
    },
    inputsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    rowInput: {
        flex: 1,
        marginHorizontal: 8,
    },
});
