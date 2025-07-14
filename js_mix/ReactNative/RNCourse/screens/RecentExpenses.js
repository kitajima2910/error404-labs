import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/context/expenses-context";
import { getDateMinusDays } from "../utils/date";
import useExpensesStore from "../store/zustand/expensesStore";

const RecentExpenses = () => {
    const expensesCtx = useContext(ExpensesContext);

    const expensesStoreExpenses = useExpensesStore((state) => state.expenses);

    const recentExpenses = expensesStoreExpenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);

        return expense.date > date7DaysAgo;
    });

    console.log("pxh: ", recentExpenses);

    return <ExpensesOutput expenses={recentExpenses} expensesPeriod={"Last 7 Days"} fallBackText={"No expenses registered for the last 7 days."} />;
};

export default RecentExpenses;

const styles = StyleSheet.create({});
