import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";

const DUMMY_EXPENSES = [
    {
        id: "e1",
        description: "A pair of shoes",
        amount: 59.99,
        date: new Date("2021-12-19"),
    },
    {
        id: "e2",
        description: "A pair of trousers",
        amount: 89.99,
        date: new Date("2021-12-19"),
    },
    {
        id: "e3",
        description: "Some bananas",
        amount: 5.99,
        date: new Date("2021-12-19"),
    },
    {
        id: "e4",
        description: "A book",
        amount: 14.99,
        date: new Date("2021-12-19"),
    },
    {
        id: "e5",
        description: "A pair of shoes",
        amount: 59.99,
        date: new Date("2021-12-19"),
    },
];

const ExpensesOutput = ({ expenses, expensesPeriod }) => {
    return (
        <View>
            <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
            <ExpensesList />
        </View>
    );
};

export default ExpensesOutput;

const styles = StyleSheet.create({});
