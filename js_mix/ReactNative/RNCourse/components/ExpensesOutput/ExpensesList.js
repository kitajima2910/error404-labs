import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import ExpensesItem from "./ExpensesItem";

const renderExpenseItem = (itemData) => {
    // return <Text>{itemData.item.description}</Text>;
    return <ExpensesItem {...itemData.item} />;
};

const ExpensesList = ({ expenses }) => {
    return <FlatList data={expenses} keyExtractor={(item) => item.id} renderItem={renderExpenseItem} />;
};

export default ExpensesList;

const styles = StyleSheet.create({});
