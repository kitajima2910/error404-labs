import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

const ExpensesOutput = ({ expenses, expensesPeriod, fallBackText: fallbackText }) => {
    let context = <Text style={styles.infoText}>{fallbackText}</Text>;

    if (expenses.length > 0) {
        context = <ExpensesList expenses={expenses} />;
    }

    return (
        <View style={styles.container}>
            <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
            {context}
        </View>
    );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700,
    },
    infoText: {
        color: "white",
        fontSize: 16,
        textAlign: "center",
        marginTop: 32,
    },
});
