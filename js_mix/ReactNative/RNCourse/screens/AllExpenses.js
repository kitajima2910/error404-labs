import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/context/expenses-context";
import useExpensesStore from "../store/zustand/expensesStore";

const AllExpenses = () => {
    const expensesCtx = useContext(ExpensesContext);

    const expensesStoreExpenses = useExpensesStore((state) => state.expenses);

    // return <ExpensesOutput expenses={expensesCtx.expenses} expensesPeriod={"Total"} fallBackText={"No registered expenses found."} />;
    return <ExpensesOutput expenses={expensesStoreExpenses} expensesPeriod={"Total"} fallBackText={"No registered expenses found."} />;
};

export default AllExpenses;

const styles = StyleSheet.create({});
