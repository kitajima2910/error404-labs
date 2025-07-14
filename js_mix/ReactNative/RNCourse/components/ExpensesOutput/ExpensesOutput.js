import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";

const ExpensesOutput = ({ expenses }) => {
    return (
        <View>
            <ExpensesSummary />
            <ExpensesList />
        </View>
    );
};

export default ExpensesOutput;

const styles = StyleSheet.create({});
